import { getFullUri } from './gltf-utils/gltf-utils';
const COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
const BYTES = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
const GL_SAMPLER = {
  TEXTURE_MAG_FILTER: 0x2800,
  TEXTURE_MIN_FILTER: 0x2801,
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803,
  REPEAT: 0x2901,
  LINEAR: 0x2601,
  NEAREST_MIPMAP_LINEAR: 0x2702
};
const SAMPLER_PARAMETER_GLTF_TO_GL = {
  magFilter: GL_SAMPLER.TEXTURE_MAG_FILTER,
  minFilter: GL_SAMPLER.TEXTURE_MIN_FILTER,
  wrapS: GL_SAMPLER.TEXTURE_WRAP_S,
  wrapT: GL_SAMPLER.TEXTURE_WRAP_T
};
const DEFAULT_SAMPLER = {
  [GL_SAMPLER.TEXTURE_MAG_FILTER]: GL_SAMPLER.LINEAR,
  [GL_SAMPLER.TEXTURE_MIN_FILTER]: GL_SAMPLER.NEAREST_MIPMAP_LINEAR,
  [GL_SAMPLER.TEXTURE_WRAP_S]: GL_SAMPLER.REPEAT,
  [GL_SAMPLER.TEXTURE_WRAP_]: GL_SAMPLER.REPEAT
};

function getBytesFromComponentType(componentType) {
  return BYTES[componentType];
}

function getSizeFromAccessorType(type) {
  return COMPONENTS[type];
}

export default class GLTFPostProcessorOld {
  postProcess(gltf, glbParser, options = {}) {
    this.gltf = gltf;
    this.glbParser = glbParser;

    this._resolveToTree(options);

    return this.gltf;
  }

  _resolveToTree(options = {}) {
    const {
      gltf
    } = this;
    (gltf.bufferViews || []).forEach((bufView, i) => this._resolveBufferView(bufView, i));
    (gltf.images || []).forEach((image, i) => this._resolveImage(image, i, options));
    (gltf.samplers || []).forEach((sampler, i) => this._resolveSampler(sampler, i));
    (gltf.textures || []).forEach((texture, i) => this._resolveTexture(texture, i));
    (gltf.accessors || []).forEach((accessor, i) => this._resolveAccessor(accessor, i));
    (gltf.materials || []).forEach((material, i) => this._resolveMaterial(material, i));
    (gltf.meshes || []).forEach((mesh, i) => this._resolveMesh(mesh, i));
    (gltf.nodes || []).forEach((node, i) => this._resolveNode(node, i));
    (gltf.skins || []).forEach((skin, i) => this._resolveSkin(skin, i));
    (gltf.scenes || []).forEach((scene, i) => this._resolveScene(scene, i));

    if (gltf.scene !== undefined) {
      gltf.scene = gltf.scenes[this.gltf.scene];
    }

    this._process_extension_KHR_lights_punctual();

    return gltf;
  }

  getScene(index) {
    return this._get('scenes', index);
  }

  getNode(index) {
    return this._get('nodes', index);
  }

  getSkin(index) {
    return this._get('skins', index);
  }

  getMesh(index) {
    return this._get('meshes', index);
  }

  getMaterial(index) {
    return this._get('materials', index);
  }

  getAccessor(index) {
    return this._get('accessors', index);
  }

  getCamera(index) {
    return null;
  }

  getTexture(index) {
    return this._get('textures', index);
  }

  getSampler(index) {
    return this._get('samplers', index);
  }

  getImage(index) {
    return this._get('images', index);
  }

  getBufferView(index) {
    return this._get('bufferViews', index);
  }

  getBuffer(index) {
    return this._get('buffers', index);
  }

  _get(array, index) {
    if (typeof index === 'object') {
      return index;
    }

    const object = this.gltf[array] && this.gltf[array][index];

    if (!object) {
      console.warn("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
    }

    return object;
  }

  _resolveScene(scene, index) {
    scene.id = "scene-".concat(index);
    scene.nodes = (scene.nodes || []).map(node => this.getNode(node));
  }

  _resolveNode(node, index) {
    node.id = "node-".concat(index);
    node.children = (node.children || []).map(child => this.getNode(child));

    if (node.mesh !== undefined) {
      node.mesh = this.getMesh(node.mesh);
    }

    if (node.camera !== undefined) {
      node.camera = this.getCamera(node.camera);
    }

    if (node.skin !== undefined) {
      node.skin = this.getSkin(node.skin);
    }
  }

  _resolveSkin(skin, index) {
    skin.id = "skin-".concat(index);
    skin.inverseBindMatrices = this.getAccessor(skin.inverseBindMatrices);
  }

  _resolveMesh(mesh, index) {
    mesh.id = "mesh-".concat(index);

    for (const primitive of mesh.primitives) {
      for (const attribute in primitive.attributes) {
        primitive.attributes[attribute] = this.getAccessor(primitive.attributes[attribute]);
      }

      if (primitive.indices !== undefined) {
        primitive.indices = this.getAccessor(primitive.indices);
      }

      if (primitive.material !== undefined) {
        primitive.material = this.getMaterial(primitive.material);
      }
    }
  }

  _resolveMaterial(material, index) {
    material.id = "material-".concat(index);

    if (material.normalTexture) {
      material.normalTexture.texture = this.getTexture(material.normalTexture.index);
    }

    if (material.occlusionTexture) {
      material.occlusionTexture.texture = this.getTexture(material.occlusionTexture.index);
    }

    if (material.emissiveTexture) {
      material.emissiveTexture.texture = this.getTexture(material.emissiveTexture.index);
    }

    if (material.pbrMetallicRoughness) {
      const mr = material.pbrMetallicRoughness;

      if (mr.baseColorTexture) {
        mr.baseColorTexture.texture = this.getTexture(mr.baseColorTexture.index);
      }

      if (mr.metallicRoughnessTexture) {
        mr.metallicRoughnessTexture.texture = this.getTexture(mr.metallicRoughnessTexture.index);
      }
    }
  }

  _resolveAccessor(accessor, index) {
    accessor.id = "accessor-".concat(index);

    if (accessor.bufferView !== undefined) {
      accessor.bufferView = this.getBufferView(accessor.bufferView);
    }

    accessor.bytesPerComponent = getBytesFromComponentType(accessor);
    accessor.components = getSizeFromAccessorType(accessor);
    accessor.bytesPerElement = accessor.bytesPerComponent * accessor.components;
  }

  _resolveTexture(texture, index) {
    texture.id = "texture-".concat(index);
    texture.sampler = 'sampler' in texture ? this.getSampler(texture.sampler) : DEFAULT_SAMPLER;
    texture.source = this.getImage(texture.source);
  }

  _resolveSampler(sampler, index) {
    sampler.id = "sampler-".concat(index);
    sampler.parameters = {};

    for (const key in sampler) {
      const glEnum = this._enumSamplerParameter(key);

      if (glEnum !== undefined) {
        sampler.parameters[glEnum] = sampler[key];
      }
    }
  }

  _enumSamplerParameter(key) {
    return SAMPLER_PARAMETER_GLTF_TO_GL[key];
  }

  _resolveImage(image, index, options) {
    image.id = "image-".concat(index);

    if (image.bufferView !== undefined) {
      image.bufferView = this.getBufferView(image.bufferView);
    }

    const {
      createImages = true
    } = options;

    if (createImages) {
      image.image = this.glbParser.getImage(image);
    } else {
      image.getImageAsync = () => {
        if (this.glbParser) {
          return this.glbParser.getImageAsync(image);
        } else if (image.uri) {
          return new Promise(resolve => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => resolve(img);

            img.src = getFullUri(image.uri, options.uri);
          });
        }

        return null;
      };
    }
  }

  _resolveBufferView(bufferView, index) {
    bufferView.id = "bufferView-".concat(index);
    bufferView.buffer = this.getBuffer(bufferView.buffer);

    if (this.glbParser) {
      bufferView.data = this.glbParser.getBufferView(bufferView);
    } else {
      const byteOffset = bufferView.byteOffset || 0;
      bufferView.data = new Uint8Array(bufferView.buffer.data, byteOffset, bufferView.byteLength);
    }
  }

  _resolveCamera(camera) {
    if (camera.perspective) {}

    if (camera.orthographic) {}
  }

  _process_extension_KHR_lights_punctual() {
    const {
      gltf
    } = this;
    const extension = gltf.extensions && gltf.extensions.KHR_lights_punctual;

    if (extension) {
      gltf.lights = extension.lights;
    }

    this._removeExtension('KHR_lights_punctual');

    for (const node of gltf.nodes || []) {
      const nodeExtension = node.extensions && node.extensions.KHR_lights_punctual;

      if (nodeExtension) {
        node.light = this._get('lights', nodeExtension.light);
        delete node.extensions.KHR_lights_punctual;
      }
    }

    delete gltf.lights;
  }

  _removeExtension(extensionName) {
    if (this.gltf.extensionsRequired) {
      this._removeStringFromArray(this.gltf.extensionsRequired, extensionName);
    }

    if (this.gltf.extensionsUsed) {
      this._removeStringFromArray(this.gltf.extensionsUsed, extensionName);
    }

    if (this.gltf.extensions) {
      delete this.gltf.extensions[extensionName];
    }
  }

  _removeStringFromArray(array, string) {
    let found = true;

    while (found) {
      const index = array.indexOf(string);

      if (index > -1) {
        array.splice(index, 1);
      } else {
        found = false;
      }
    }
  }

}
//# sourceMappingURL=gltf-post-processor-old.js.map
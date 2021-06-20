import XVIZObject from './xviz-object';
export default class XVIZObjectCollection {
  constructor({
    ObjectType = XVIZObject
  } = {}) {
    this.objects = new Map();
    this.ObjectType = ObjectType;
  }

  clear() {
    this.objects.clear();
  }

  count() {
    return this.objects.size;
  }

  observe(id, timestamp) {
    if (id === undefined || id === null) {
      return;
    }

    id = id.toString();

    if (this.objects.has(id)) {
      const object = this.objects.get(id);

      object._observe(timestamp);
    } else {
      const object = new this.ObjectType({
        id,
        timestamp
      });
      this.objects.set(id, object);
    }
  }

  get(id) {
    if (id === undefined || id === null) {
      return null;
    }

    id = id.toString();
    return this.objects.get(id) || null;
  }

  resetAll() {
    this.objects.forEach(object => object._reset());
  }

  getAll() {
    const result = {};
    this.objects.forEach((object, id) => {
      result[id] = object;
    });
    return result;
  }

  getAllInCurrentFrame() {
    const result = {};
    this.objects.forEach((object, id) => {
      if (object.isValid) {
        result[id] = object;
      }
    });
    return result;
  }

  prune(startTime, endTime) {
    const {
      objects
    } = this;
    const idsToRemove = [];
    objects.forEach((object, id) => {
      if (object.endTime < startTime || object.startTime > endTime) {
        idsToRemove.push(id);
      }
    });
    idsToRemove.forEach(id => {
      objects.delete(id);
    });
  }

}
//# sourceMappingURL=xviz-object-collection.js.map
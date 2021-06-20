import Ajv from 'ajv';
import { SCHEMA_DATA } from './data';
export class ValidationError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, ValidationError);
  }

}
export class XVIZValidator {
  constructor() {
    this.ajv = newAjv();

    for (const schemaName in SCHEMA_DATA) {
      const schemaData = SCHEMA_DATA[schemaName];
      this.ajv.addSchema(schemaData, schemaName);
    }
  }

  validateMetadata(data) {
    this.validate('session/metadata.schema.json', data);
  }

  validateStateUpdate(data) {
    this.validate('session/state_update.schema.json', data);
  }

  validateStreamSet(data) {
    this.validate('core/stream_set.schema.json', data);
  }

  validatePose(data) {
    this.validate("core/pose.schema.json", data);
  }

  validatePrimitive(type, data) {
    this.validate("primitives/".concat(type, ".schema.json"), data);
  }

  validateTimeSeries(data) {
    this.validate('core/timeseries_state.schema.json', data);
  }

  validateFutureInstances(data) {
    this.validate('core/future_instances.schema.json', data);
  }

  validateVariable(data) {
    this.validate('core/variable.schema.json', data);
  }

  validateAnnotation(type, data) {
    this.validate("core/annotation_".concat(type, ".schema.json"), data);
  }

  validate(schemaName, data) {
    const schemaValidator = this._getSchema(schemaName);

    if (schemaValidator === undefined) {
      const error = "Could not load schema: ".concat(schemaName);
      throw error;
    }

    const valid = schemaValidator(data);

    if (!valid) {
      const errorDescription = JSON.stringify(schemaValidator.errors, null, '  ');
      throw new ValidationError("Validation errors: ".concat(errorDescription));
    }
  }

  schemaCount() {
    return Object.keys(this.ajv._schemas).length;
  }

  hasSchema(schemaName) {
    return this._getSchema(schemaName) !== undefined;
  }

  _getSchema(schemaName) {
    if (!schemaName.endsWith('.schema.json')) {
      schemaName += '.schema.json';
    }

    return this.ajv.getSchema(schemaName);
  }

}
export function newAjv() {
  const validator = newAjvDraft4();
  return validator;
}

function newAjvDraft4() {
  const ajv = new Ajv({
    meta: false,
    schemaId: 'id',
    extendRefs: 'fail'
  });

  const metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');

  ajv.addMetaSchema(metaSchema);
  ajv._opts.defaultMeta = metaSchema.id;
  ajv.removeKeyword('propertyNames');
  ajv.removeKeyword('contains');
  ajv.removeKeyword('const');
  return ajv;
}
//# sourceMappingURL=validator.js.map
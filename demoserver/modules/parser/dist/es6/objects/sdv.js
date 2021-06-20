import BaseObject from './base-object';
import { Vector3, degrees } from 'math.gl';
import assert from '../utils/assert';
export default class SDV extends BaseObject {
  constructor({
    vehicleLog,
    validate = false
  }) {
    if (validate) {
      assert(validate || vehicleLog, 'sdv validate');
    }

    super();
    this.xvizLog = vehicleLog;
  }

  get isValid() {
    return Boolean(this.xvizLog);
  }

  get position() {
    return this.xvizLog && new Vector3().copy(this.xvizLog.carPosition);
  }

  get bearing() {
    return this.xvizLog && degrees(this.xvizLog.heading);
  }

}
//# sourceMappingURL=sdv.js.map
export class TypeGaurd {
  static isNullOrUndefined(value: unknown): boolean {
    return TypeGaurd.isNull(value) || TypeGaurd.isUndefined(value);
  }

  static isNull(value: unknown): boolean {
    if (value === null) {
      return true;
    }
    return false;
  }

  static isUndefined(value: unknown): boolean {
    if (typeof value === 'undefined') {
      return true;
    }
    return false;
  }
}

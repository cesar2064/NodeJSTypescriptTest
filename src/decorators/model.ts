import ModelOptions from "../interfaces/model-options";

/**
 * Defines a class as a model.
 * @param target  class target
 * @returns a function used by typescript for decorating
 */
export function model(options: ModelOptions = {}): (target: any) => void {
    return (target: any) => {
        target._options = options;
    }
}

/**
 * Defines an attribute as a column.
 * @param target  class target
 * @param key  key name
 */
export function column(target: any, key: string): void {
    target._attributes = target._attributes || [];
    target._attributes.push(key);
}
import ControllerOptions from "../interfaces/controller-options";
import PathOptions from "../interfaces/path-options";

/**
 * Defines a class as a controller.
 * @param options  the options for creating the route
 * @returns a function used by typescript for decorating
 */
export function controller(options: ControllerOptions): (target: any) => void {
    return (target: any) => {
        target._options = options;
    }
}

/**
 * Defines a method as a path of the controller.
 * @param options  the options for creating the route
 * @returns a function used by typescript for decorating
 */
export function path(options: PathOptions): (target: any, property: string) => void {
    return (target: any, propertyKey: string) => {
        target._subPaths = target._subPaths || [];
        target._subPaths.push({
            method: propertyKey,
            options
        })
    }
}
export default interface ModelInterface {
    execute(model: any): void;
    associate(model: any, models: Array<any>): void;
}
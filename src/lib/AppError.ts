export class AppError extends Error {
    constructor(
        public statusCode: number,
        public responseCode: string,
        public message: string,
        public errors?: any
    ) {
        super(message);
        Error.captureStackTrace(this, AppError);
    }
}
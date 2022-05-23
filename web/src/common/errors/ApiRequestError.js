export class ApiRequestError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "ApiRequestError";
        this.statusCode = statusCode
    }
}
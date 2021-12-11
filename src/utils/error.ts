class GeneralError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }

    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        }

        if (this instanceof NotFound) {
            return 404;
        }
        if (this instanceof Conflict) {
            return 409;
        }
    }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Conflict extends GeneralError {}

export { BadRequest, NotFound, GeneralError };

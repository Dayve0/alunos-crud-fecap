export class ErrorResponse extends Error {
    public readonly code: number;

    constructor(message: string, code = 400) {
        super(message);
        this.code = code;

        // Mantém o nome da classe correto no console
        Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
}
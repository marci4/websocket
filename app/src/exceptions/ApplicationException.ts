export default class ApplicationException {
    private _message: string;
    private _origin: string|null;
    private _code: number|null;

    get message() {
        return this._message;
    }

    set message(value :string) {
        this._message = value;
    }

    get origin(): string|null{
        return this._origin;
    }

    set origin(value :string|null) {
        this._origin = value;
    }

    get code(): number|null {
        return this._code;
    }

    set code(value: number|null) {
        this._code = value;
    }

    public constructor(message:string, origin:string|null, code:number|null) {
        this.message = message;
        this.origin = origin;
        this.code = code;
    }
}

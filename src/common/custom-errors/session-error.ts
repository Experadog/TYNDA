export class ClearSessionError extends Error {
	constructor(message = 'Session needs to be cleared') {
		super(message);
		this.name = 'ClearSessionError';
	}
	getMessage() {
		return this.message;
	}
}

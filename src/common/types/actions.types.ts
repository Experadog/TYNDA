export interface InterfaceAction<Request = unknown, Response = unknown> {
    execute(request: Request): Promise<Response>;
}

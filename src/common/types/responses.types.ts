export type CommonResponse<T> = {
    code: number;
    msg: string;
    data: T;
};

export type CommonResponse<T> = {
    code: number;
    msg: string;
    data: T;
};

export type Paginated<T> = {
    code: number;
    msg: string;
    items: Array<T>;
    total: number;
    page: number;
    size: number;
    total_pages: number;
    links: {
        first: string;
        last: string;
        self: string;
        next?: string;
        prev?: string;
    };
};

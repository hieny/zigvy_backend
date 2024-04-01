
export interface BaseResponseType<T> {
    status: boolean;
    data?: T,
    message?: string;
}

export interface BaseResponseTypePagination<T> extends BaseResponseType<T>  {
    pagination: {
        currentPage: number;
        limit: number;
        totalPage: number;
    }
}
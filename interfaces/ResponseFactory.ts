export interface ResponseFactory<T> {
    message: string;
    success: boolean;
    data: T;
}



export interface IHash<type> {
    [id: string]: type;
}


export type WithIDField = unknown & {
    id: string;
}


export type StatusObject<T = unknown> = {
    status: "success" | "pending" | "error" | "uninitialized";
    message?: string | null;
    value?: T | null;
}
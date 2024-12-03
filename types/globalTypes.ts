

export interface IHash<type> {
    [id: string]: type;
}


export type WithIDField = any & {
    id: string;
}


export type StatusObject = {
    status: "success" | "pending" | "error" | "uninitialized";
    message?: string | null;
    value?: any;
}
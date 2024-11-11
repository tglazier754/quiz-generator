

export interface IHash<type> {
    [id: string]: type;
}


export type WithIDField = any & {
    id: string;
}
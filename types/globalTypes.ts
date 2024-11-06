import { Resource } from "./resourceTypes";

export interface IHash {
    [id: string]: any;
}

export interface ResourceHash {
    [id: string]: Resource;
}
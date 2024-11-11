import { IHash, WithIDField } from "@/types/globalTypes";


export const convertObjectArrayToHashMap = (arr: WithIDField[]) => {
    const resourceHashMap: IHash<WithIDField> = {};
    arr.forEach((item: WithIDField) => {
        if (typeof item.id === 'string') {
            resourceHashMap[item.id as string] = item;
        }
    });

    return resourceHashMap
}
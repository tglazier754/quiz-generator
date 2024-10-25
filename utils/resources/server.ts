"use server";
import { RESOURCE_ORIGIN_USER, TABLE_RESOURCES } from "@/types/constants";
import { createClient } from "../supabase/server";
import { Resource } from "@/types/resourceTypes";


export const getResources = async () => {
    const supabaseConnection = createClient();
    const { data: userData } = await supabaseConnection?.auth.getUser();

    //TODO: Proper checks for logged in user
    if (userData) {
        //offset, count, type v2 - tags

        //const pageOffset = parseInt(searchParams.get(URL_PARAM_OFFSET) as string) || DEFAULT_SELECT_PAGE_OFFSET;
        //const pageSize = parseInt(searchParams.get(URL_PARAM_COUNT) as string) || DEFAULT_PAGE_SIZE;
        //const totalOffset = pageOffset * pageSize;

        //TODO: make sure we use the totalOffset
        const { data } = await supabaseConnection.from(TABLE_RESOURCES).select().eq("origin", RESOURCE_ORIGIN_USER);
        return JSON.stringify(data);
    }
}

export const postNewResource = async (resource: Resource) => {
    const supabaseConnection = createClient();
    await supabaseConnection?.auth.getUser();

    const { data } = await supabaseConnection?.from(TABLE_RESOURCES).insert(resource).select();
    return data;
}
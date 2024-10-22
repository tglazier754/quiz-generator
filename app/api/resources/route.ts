import { createClient } from "@/utils/supabase/server";
import { Resource } from "../../../types/resourceTypes";

import * as constants from "@/types/constants";
import { DEFAULT_PAGE_SIZE, DEFAULT_SELECT_PAGE_OFFSET, RESOURCE_TYPE_LIBRARY, TABLE_RESOURCES, URL_PARAM_COUNT, URL_PARAM_OFFSET, URL_PARAM_RESOURCE_TYPE } from "@/types/constants";


export async function GET(request: Request) {
    const reqUrl = request.url;
    const { searchParams } = new URL(reqUrl);

    const supabaseConnection = createClient();
    const { data: userData, error: userError } = await supabaseConnection?.auth.getUser();

    if (userData) {
        //offset, count, type v2 - tags

        const pageOffset = parseInt(searchParams.get(URL_PARAM_OFFSET) as string) || DEFAULT_SELECT_PAGE_OFFSET;
        const pageSize = parseInt(searchParams.get(URL_PARAM_COUNT) as string) || DEFAULT_PAGE_SIZE;
        const totalOffset = pageOffset * pageSize;
        const type = searchParams.get(URL_PARAM_RESOURCE_TYPE) || RESOURCE_TYPE_LIBRARY;

        //TODO: make sure we use the totalOffset
        const { data, error } = await supabaseConnection.from(TABLE_RESOURCES).select().eq("type", type);
        console.log(data);
        return new Response(JSON.stringify(data));
    }
}

export async function POST(request: Request) {
    const formData = await request.formData();
    const resourceData = formData.get("data") as string;
    console.log(resourceData);

    if (resourceData) {
        const supabaseConnection = createClient();
        const { data, error } = await supabaseConnection?.auth.getUser();
        console.log(data);

        const insert = await supabaseConnection?.from('resources').insert(JSON.parse(resourceData)).select();
        console.log(insert);
    }

    return new Response(JSON.stringify(resourceData));
}

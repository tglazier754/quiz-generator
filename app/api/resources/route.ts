import { getAllResources, postNewResource } from "@/utils/resources/server";
import { createClient } from "@/utils/supabase/server";


export async function GET() {
    //const reqUrl = request.url;
    //const { searchParams } = new URL(reqUrl);

    const data = await getAllResources();
    return new Response(data);

}

export async function POST(request: Request) {
    const supabaseConnection = createClient();
    const userData = await supabaseConnection?.auth.getUser();

    if (userData) {
        const formData = await request.formData();
        const resourceData = formData.get("data") as string;

        if (resourceData) {
            const data = postNewResource(supabaseConnection, JSON.parse(resourceData));
            return new Response(JSON.stringify(data));
        }
    }
    else {
        //redirect to /login
        return new Response("Invalid login", { status: 500 });
    }

    return new Response("No resource data included in POST", { status: 500 });
}

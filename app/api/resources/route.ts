import { getAllResources, postNewResource, putExistingResource } from "@/utils/resources/server";
import { createClient } from "@/utils/supabase/server";


export async function GET() {
    //const reqUrl = request.url;
    //const { searchParams } = new URL(reqUrl);

    const data = await getAllResources();
    return Response.json({status:"sucess", value:data}, {status:200, statusText:"OK"});

}

export async function POST(request: Request) {
    const supabaseConnection = createClient();
    const userData = await supabaseConnection?.auth.getUser();

    if (userData) {
        const formData = await request.formData();
        const resourceData = formData.get("data") as string;

        if (resourceData) {
            const data = await postNewResource(supabaseConnection, JSON.parse(resourceData));
            //console.log(data);
            return Response.json({status:"success", value:data}, {status:200, statusText:"OK"});
        }
    }
    else {
        //TODO: redirect to /login
        return Response.json({status:"erro", message:"Invalid login"}, { status: 401, statusText:"Unauthorized" });
    }

    return Response.json({status:"error", message:"No resource data included in POST"}, { status: 500, statusText:"Server Error" });
}

export async function PUT(request: Request) {
    const supabaseConnection = createClient();
    const userData = await supabaseConnection?.auth.getUser();
    //console.log(userData);

    if (userData) {
        const formData = await request.formData();
        const resourceData = formData.get("data") as string;

        if (resourceData) {
            const data = await putExistingResource(supabaseConnection, JSON.parse(resourceData));
            //console.log(data);
            return Response.json({status:"success", value:data}, {status:200, statusText:"OK"});
        }
    }

    else {
        //TODO: redirect to /login
        return Response.json({status:"error", message:"Invalid login"}, { status: 401, statusText:"Unauthenticated" });
    }

    return Response.json({status:"error", message:"No resource data included in POST"}, { status: 500, statusText:"Server Error" });
}
import { postNewQuizQuestion, putExistingQuizQuestion } from "@/utils/quiz_questions/server";
import { createClient } from "@/utils/supabase/server";


export async function POST(request: Request) {
    const supabaseConnection = createClient();
    const userData = await supabaseConnection?.auth.getUser();

    if (userData) {
        const formData = await request.formData();
        const resourceData = formData.get("data") as string;

        if (resourceData) {
            const data = await postNewQuizQuestion(supabaseConnection, JSON.parse(resourceData));
            //console.log(data);
            return Response.json({ status: "success", data }, { status: 200, statusText: "Success" });
        }
    }
    else {
        //TODO: redirect to /login
        return Response.json({ status: "error", data: "Invalid login" }, { status: 401, statusText: "Unauthorized" });
    }

    return Response.json({ status: "error", data: "No resource data included in POST" }, { status: 500, statusText: "Server Error"});
}

export async function PUT(request: Request) {
    const supabaseConnection = createClient();
    const userData = await supabaseConnection?.auth.getUser();

    if (userData) {
        const formData = await request.formData();
        const resourceData = formData.get("data") as string;

        if (resourceData) {
            const data = await putExistingQuizQuestion(supabaseConnection, JSON.parse(resourceData));
            //console.log(data);
            return Response.json({ status: "success", data }, { status: 200, statusText: "Success" });
        }
    }
    else {
        //TODO: redirect to /login
        return Response.json({ status: "error", data: "Invalid login" }, { status: 401, statusText: "Unauthorized" });
    }

    return Response.json({ status: "error", data: "No resource data included in POST" }, { status: 500, statusText: "Server Error" });
}
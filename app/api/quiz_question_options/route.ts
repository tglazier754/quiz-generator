import { deleteExistingQuizQuestionOption, postNewQuizQuestionOption, putExistingQuizQuestionOption } from "@/utils/quiz_question_options/server";
import { createClient } from "@/utils/supabase/server";


export async function POST(request: Request) {
    const supabaseConnection = createClient();
    const userData = await supabaseConnection?.auth.getUser();

    if (userData) {
        const formData = await request.formData();
        const resourceData = formData.get("data") as string;

        if (resourceData) {
            const data = await postNewQuizQuestionOption(supabaseConnection, JSON.parse(resourceData));
            //console.log(data);
            if (data.status === "error") return Response.json (data, {status:500, statusText:"Server Error"});
            return Response.json(data, { status: 200, statusText: "Success" });
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
            const data = await putExistingQuizQuestionOption(supabaseConnection, JSON.parse(resourceData));
            //console.log(data);
            if (data.status === "error") return Response.json (data, {status:500, statusText:"Server Error"});
            return Response.json(data, { status: 200, statusText: "Success" });
        }
    }
    else {
        //TODO: redirect to /login
        return Response.json({ status: "error", data: "Invalid login" }, { status: 401, statusText: "Unauthorized" });
    }

    return Response.json({ status: "error", data: "No resource data included in POST" }, { status: 500, statusText: "Server Error" });
}

export async function DELETE(request:Request) {
    const supabaseConnection = createClient();
    const userData = await supabaseConnection?.auth.getUser();

    if (userData){
        const formData = await request.formData();
        const resourceData = formData.get("data") as string;

        if (resourceData) {
            const data = await deleteExistingQuizQuestionOption(supabaseConnection, JSON.parse(resourceData));
            //console.log(data);
            if (data.status === "error") return Response.json (data, {status:500, statusText:"Server Error"});
            return Response.json(data, { status: 200, statusText: "Success" });
        }
    }
    else {
        //TODO: redirect to /login
        return Response.json({ status: "error", data: "Invalid login" }, { status: 401, statusText: "Unauthorized" });
    }

    return Response.json({ status: "error", data: "No resource data included in POST" }, { status: 500, statusText: "Server Error" });
}
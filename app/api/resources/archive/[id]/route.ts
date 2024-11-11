import { archiveExistingResource } from "@/utils/resources/server";
import { createClient } from "@/utils/supabase/server";


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id);
    const supabaseConnection = createClient();
    const userData = await supabaseConnection?.auth.getUser();
    console.log(userData);

    if (userData) {
        console.log(userData);

        const data = await archiveExistingResource(supabaseConnection, id);
        return new Response(JSON.stringify(data));
    }
}
import { getResources, postNewResource } from "@/utils/resources/server";


export async function GET() {
    //const reqUrl = request.url;
    //const { searchParams } = new URL(reqUrl);

    const data = await getResources();
    return new Response(data);

}

export async function POST(request: Request) {
    const formData = await request.formData();
    const resourceData = formData.get("data") as string;

    if (resourceData) {
        const data = postNewResource(JSON.parse(resourceData));
        return new Response(JSON.stringify(data));
    }

    return new Response("No resource data included in POST", { status: 500 });
}

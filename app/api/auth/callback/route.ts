import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const supabase = createClient();

    if (code) {
        const exchangedToken = await supabase.auth.exchangeCodeForSession(code);
        console.log(exchangedToken);

        //need to store that token in the cookies
    }

    const user = await supabase.auth.getUser();
    const { data, error } = user;
    console.log(data);

    if (error) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (data) {
        //get user data from database
    }

    return NextResponse.redirect(new URL("/library", req.url));
}
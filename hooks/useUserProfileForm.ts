
import { TABLE_USERS } from "@/types/constants";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { RefObject, useState } from "react";

export type SignInError = {
    message: string;
    code: number;
}

type useUserProfileReturnType = {
    submitProfileData: () => void;
    error: boolean;
    errorMessage: string;
}

//TODO: Rename this
export function useUserProfileForm(firstNameRef: RefObject<HTMLInputElement>, lastNameRef: RefObject<HTMLInputElement>, roleRef: RefObject<HTMLInputElement>, subjectRef: RefObject<HTMLInputElement>): useUserProfileReturnType {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();


    async function handleSubmitProfileData() {
        setErrorMessage("");
        setError(false);
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const role = roleRef.current?.value;
        const subject = subjectRef.current?.value;

        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        const { user } = data;
        if (user && user.id && !error) {

            console.log({ id: user.id, first_name: firstName, last_name: lastName, title: role, subject });
            const { data, error } = await supabase.from(TABLE_USERS).insert({ id: user.id, first_name: firstName, last_name: lastName, title: role, complete: true }).select();
            console.log(data);
            if (error) {
                setError(true);
                setErrorMessage(error.message);
            }
            else {
                //TODO: Check the user data and either redirect to the library or to the info gathering
                router.push("/library");
            }
        }
    }


    return { submitProfileData: handleSubmitProfileData, error, errorMessage }

}
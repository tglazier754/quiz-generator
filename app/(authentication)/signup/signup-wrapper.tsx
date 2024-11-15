import ProfileForm from "./profile-form";
import SignUpForm from "./signup-form";



type SignupWrapperProps = {
    screen: number;
}

export default function SignupWrapper(props: SignupWrapperProps) {
    const { screen } = props;

    if (screen === 1) {
        return (
            <SignUpForm />
        )
    }
    if (screen === 2) {
        return (
            <ProfileForm />
        )
    }
}
import { Card, CardBody } from "@chakra-ui/react";

export const Loading = () => {

    return (
        <div className="centered-container">
            <Card>
                <CardBody>
                    <p className="text-center">Loading</p>
                </CardBody>
            </Card>

        </div>
    );
}

export default Loading;
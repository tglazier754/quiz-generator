import { Card, CardBody } from "@chakra-ui/react";

export const Loading = () => {

    return (
        <div className="parent-container">
            <Card>
                <CardBody>
                    <p className="text-center">Loading</p>
                </CardBody>
            </Card>

        </div>
    );
}

export default Loading;
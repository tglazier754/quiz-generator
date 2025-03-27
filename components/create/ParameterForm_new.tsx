"use client";
import { GRADE_LEVELS } from "@/types/constants";
import { SubmitHandler } from "react-hook-form";
import { useContext, useState } from "react";
import { ContentCreationContext } from "@/context/create/provider";
import { useRouter } from "next/navigation";
import useResourceCreation from "@/hooks/useResourceCreation";
import { ResourceGenerationParams } from "@/utils/resources/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "sonner"
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

type IntensityLevel = "light" | "medium" | "heavy"

export const ParameterForm = () => {

    const router = useRouter();
    const [resourceType, setResourceType] = useState<"quiz" | "lesson">("quiz")
    const [gradeLevel, setGradeLevel] = useState("")
    const [duration, setDuration] = useState(30)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // Quiz specific state - using intensity levels instead of percentages
    const [multipleChoiceIntensity, setMultipleChoiceIntensity] = useState<IntensityLevel>("medium");
    const [trueFalseIntensity, setTrueFalseIntensity] = useState<IntensityLevel>("light");
    const [shortAnswerIntensity, setShortAnswerIntensity] = useState<IntensityLevel>("light");
    const [longFormIntensity, setLongFormIntensity] = useState<IntensityLevel>("light");


    const { inputContent } = useContext(ContentCreationContext);
    const { createResource, uploadStatus } = useResourceCreation();


    const handleCreateResource: SubmitHandler<ResourceGenerationParams> = async (data: ResourceGenerationParams) => {
        console.log(data);
        const generatedResource = await createResource(data, Array.from(inputContent.keys()));
        if (generatedResource.status === "success" && generatedResource.value) {
            console.log(generatedResource);
            router.push(`/resource?id=${generatedResource.value.id}`);
        }
        else {
            toast("Error", { description: generatedResource?.message });
        }
    }


    return (
        <div className="w-full max-w-[800px] mx-auto">
            <h1 className="text-3xl font-bold mb-8">Generate New Resource</h1>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Resource Information</CardTitle>
                    <CardDescription>Enter the basic information for your new resource</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Resource Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter a title for your resource"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Input
                            id="description"
                            placeholder="Enter a brief description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Resource Type</Label>
                        <RadioGroup
                            defaultValue="quiz"
                            className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                            value={resourceType}
                            onValueChange={(value) => setResourceType(value as "quiz" | "lesson")}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="quiz" id="quiz" />
                                <Label htmlFor="quiz" className="cursor-pointer">
                                    Quiz
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="lesson" id="lesson" />
                                <Label htmlFor="lesson" className="cursor-pointer">
                                    Lesson Plan
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="grade-level">Grade Level</Label>
                        <Select value={gradeLevel} onValueChange={setGradeLevel} required>
                            <SelectTrigger id="grade-level">
                                <SelectValue placeholder="Select grade level" />
                            </SelectTrigger>
                            <SelectContent>
                                {GRADE_LEVELS.map((level) => {
                                    return <SelectItem value={level}>{level}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="duration">Expected Duration to Complete</Label>
                            <span className="text-sm text-muted-foreground">{duration} minutes</span>
                        </div>
                        <Slider
                            id="duration"
                            min={5}
                            max={120}
                            step={5}
                            value={[duration]}
                            onValueChange={(value) => setDuration(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>5 min</span>
                            <span>120 min</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {resourceType === "quiz" && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Question Type Breakdown</CardTitle>
                        <CardDescription>Specify the intensity level for each question type</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="multiple-choice-intensity">Multiple Choice Questions</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button
                                    type="button"
                                    variant={multipleChoiceIntensity === "light" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setMultipleChoiceIntensity("light")}
                                >
                                    Light
                                </Button>
                                <Button
                                    type="button"
                                    variant={multipleChoiceIntensity === "medium" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setMultipleChoiceIntensity("medium")}
                                >
                                    Medium
                                </Button>
                                <Button
                                    type="button"
                                    variant={multipleChoiceIntensity === "heavy" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setMultipleChoiceIntensity("heavy")}
                                >
                                    Heavy
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {multipleChoiceIntensity === "light" && "A few multiple choice questions"}
                                {multipleChoiceIntensity === "medium" && "A moderate number of multiple choice questions"}
                                {multipleChoiceIntensity === "heavy" && "Many multiple choice questions"}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="true-false-intensity">True/False Questions</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button
                                    type="button"
                                    variant={trueFalseIntensity === "light" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setTrueFalseIntensity("light")}
                                >
                                    Light
                                </Button>
                                <Button
                                    type="button"
                                    variant={trueFalseIntensity === "medium" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setTrueFalseIntensity("medium")}
                                >
                                    Medium
                                </Button>
                                <Button
                                    type="button"
                                    variant={trueFalseIntensity === "heavy" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setTrueFalseIntensity("heavy")}
                                >
                                    Heavy
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {trueFalseIntensity === "light" && "A few true/false questions"}
                                {trueFalseIntensity === "medium" && "A moderate number of true/false questions"}
                                {trueFalseIntensity === "heavy" && "Many true/false questions"}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="short-answer-intensity">Short Answer Questions</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button
                                    type="button"
                                    variant={shortAnswerIntensity === "light" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setShortAnswerIntensity("light")}
                                >
                                    Light
                                </Button>
                                <Button
                                    type="button"
                                    variant={shortAnswerIntensity === "medium" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setShortAnswerIntensity("medium")}
                                >
                                    Medium
                                </Button>
                                <Button
                                    type="button"
                                    variant={shortAnswerIntensity === "heavy" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setShortAnswerIntensity("heavy")}
                                >
                                    Heavy
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {shortAnswerIntensity === "light" && "A few short answer questions"}
                                {shortAnswerIntensity === "medium" && "A moderate number of short answer questions"}
                                {shortAnswerIntensity === "heavy" && "Many short answer questions"}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="short-answer-intensity">Long Form Questions</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Button
                                    type="button"
                                    variant={longFormIntensity === "light" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setLongFormIntensity("light")}
                                >
                                    Light
                                </Button>
                                <Button
                                    type="button"
                                    variant={longFormIntensity === "medium" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setLongFormIntensity("medium")}
                                >
                                    Medium
                                </Button>
                                <Button
                                    type="button"
                                    variant={longFormIntensity === "heavy" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setLongFormIntensity("heavy")}
                                >
                                    Heavy
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {longFormIntensity === "light" && "A few short answer questions"}
                                {longFormIntensity === "medium" && "A moderate number of short answer questions"}
                                {longFormIntensity === "heavy" && "Many short answer questions"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )

}

export default ParameterForm;
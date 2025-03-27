"use client"
import { Resource } from "@/types/resourceTypes";
import { useEffect, useMemo, useState } from "react"
import { Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import QuizCard from "../quiz/quizCard";
import { useResourceValues } from "./useResourceValues";
import { EditableTextField } from "../quiz/EditableTextField";

type ResourcePreviewProps = {
    resource: Resource;
}
export const ResourcePreview = (props: ResourcePreviewProps) => {
    const { resource } = props;
    const { quiz_questions } = resource;
    const [activeTab, setActiveTab] = useState("overview");

    const { localStore, updateField } = useResourceValues(resource);
    const { name, description, expected_duration, grade_level } = localStore;


    const sortedQuestions = useMemo(() => {
        return quiz_questions?.sort((a, b) => { return a.order - b.order }) || [];
    }, [quiz_questions]);

    useEffect(() => {
        console.log(localStore);
    }, [localStore]);

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab}
            className="w-full min-w-full h-full max-h-full flex relative">
            <div className="flex-0 w-full">
                <div className="flex justify-between items-start mb-8 mt-8 w-full">

                    <div>
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">
                                {resource.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Created: {new Date(resource.created_at!).toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground">Modified: {new Date(resource.last_modified!).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-h-full h-full min-h-0 flex-1 relative">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="content">Content</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="overview" className="max-h-full w-full  min-w-0 h-full p-8 min-h-0 overflow-y-auto  no-scrollbar">
                    <Card>
                        <CardHeader>
                            <CardTitle>Resource Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                                <EditableTextField initialText={name} onSave={(text) => updateField("name", text)} />
                            </div><div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                                <EditableTextField initialText={description} onSave={(text) => updateField("description", text)} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {grade_level ?
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Grade Level</h3>
                                        <p className="capitalize">{grade_level && grade_level.replace("-", " to ")}</p>

                                    </div>
                                    : null}
                                {expected_duration ?
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Duration</h3>
                                        <p>{expected_duration && `${expected_duration} minutes`}</p>
                                    </div>
                                    : null}
                            </div>


                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="content" className="max-h-full h-full p-8 min-h-0 overflow-y-auto pb-16 no-scrollbar">
                    {resource.type === "QUIZ" && resource.quiz_questions && (
                        <div className="space-y-6 mb-16">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Questions ({resource.quiz_questions.length})</h2>
                                <Button variant="outline">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Question
                                </Button>
                            </div>

                            {sortedQuestions.map((question) => (
                                <QuizCard question={question} key={`quiz-question-${question.id}`} />
                            ))}
                        </div>
                    )}

                    {resource.type === "LESSON_PLAN" && (
                        <div className="space-y-6 mb-16">
                            <Card key={resource.id}>
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">

                                        <CardTitle className="text-base font-medium mt-2">Resource Content</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">{resource.expected_duration} min</Badge>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>{resource.value}</p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {resource.type !== "LESSON_PLAN" &&
                        resource.type !== "QUIZ" && (
                            <div className="space-y-6 mb-16">
                                <Card key={resource.id}>
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">

                                            <CardTitle className="text-base font-medium mt-2">Resource Content</CardTitle>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{resource.value}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                </TabsContent>
            </div>
        </Tabs >

    );
}

export default ResourcePreview;
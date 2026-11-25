"use client"
import { Resource } from "@/types/resourceTypes";
import { useMemo, useState } from "react"
import { Edit, Plus, Save, Trash, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import QuizCard from "../quiz/quizCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type ResourcePreviewProps = {
    resource: Resource;
}
export const ResourcePreview = (props: ResourcePreviewProps) => {
    const { resource } = props;
    const { quiz_questions } = resource;
    const [activeTab, setActiveTab] = useState("overview");
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(resource.name);
    const [description, setDescription] = useState(resource.description);
    const [gradeLevel, setGradeLevel] = useState(resource.grade_level);
    const [expectedDuration, setExpectedDuration] = useState(resource.expected_duration);


    const sortedQuestions = useMemo(() => {
        return quiz_questions?.sort((a, b) => { return a.order - b.order }) || [];
    }, [quiz_questions]);

    const handleCancel = () => {
        // Reset form values to current resource values
        if (resource) {
            setName(resource.name)
            setDescription(resource.description || "")
            setGradeLevel(resource.grade_level)
            setExpectedDuration(resource.expected_duration)
        }

        setIsEditing(false)
    }

    const handleSave = () => {

    }

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
                            <div className="flex flex-row justify-between w-full">
                                {isEditing ?
                                    <div className="flex flex-col">
                                        <CardTitle>Resource Information</CardTitle>
                                        <CardDescription>Edit the basic information for this resource</CardDescription>
                                    </div>
                                    : <CardTitle>Resource Overview</CardTitle>}


                            </div>
                        </CardHeader>

                        {isEditing ? (

                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Resource Title</Label>
                                    <Input id="title" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="grade-level">Grade Level</Label>
                                        <Select value={gradeLevel} onValueChange={setGradeLevel} required>
                                            <SelectTrigger id="grade-level">
                                                <SelectValue placeholder="Select grade level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="k-2">K-2 (Elementary)</SelectItem>
                                                <SelectItem value="3-5">3-5 (Elementary)</SelectItem>
                                                <SelectItem value="6-8">6-8 (Middle School)</SelectItem>
                                                <SelectItem value="9-12">9-12 (High School)</SelectItem>
                                                <SelectItem value="college">College</SelectItem>
                                                <SelectItem value="professional">Professional</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="duration">Duration (minutes)</Label>
                                        <Input
                                            id="duration"
                                            type="number"
                                            min={5}
                                            max={240}
                                            value={expectedDuration}
                                            onChange={(e) => setExpectedDuration(Number.parseInt(e.target.value) || 30)}
                                        />
                                    </div>
                                </div>

                                {resource.type === "quiz" && (
                                    <div className="space-y-4 pt-4 border-t">
                                        <h3 className="text-lg font-medium">Question Type Breakdown</h3>



                                    </div>
                                )}
                            </CardContent>
                        ) : (
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                                    <p>{name}</p>
                                </div><div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                                    <p>{description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                    {gradeLevel ?
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Grade Level</h3>
                                            <p className="capitalize">{gradeLevel && gradeLevel.replace("-", " to ")}</p>

                                        </div>
                                        : null}
                                    {expectedDuration ?
                                        <div>
                                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Duration</h3>
                                            <p>{expectedDuration && `${expectedDuration} minutes`}</p>
                                        </div>
                                        : null}
                                </div>


                            </CardContent>
                        )}
                        <CardFooter>
                            <div>
                                {!isEditing ? (
                                    <Button onClick={() => setIsEditing(true)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={handleCancel}>
                                            <X className="h-4 w-4 mr-2" />
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSave}>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardFooter>
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
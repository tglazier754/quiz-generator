import { RESOURCE_TYPES } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";
import Image from "next/image"
import { BookOpen, Check, FileText, ImageIcon, Globe, MessageSquare } from "lucide-react"
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ResourceCardProps = {
    resource: Resource;
    isSelected: boolean;
    clickAction: (resource: Resource, state: boolean) => void;
    children: ReactNode
}

export const ResourceCard = (props: ResourceCardProps) => {
    const { resource, isSelected, clickAction, children } = props;
    console.log(resource);
    return (
        <Card
            key={resource.id}
            className={`overflow-hidden relative cursor-pointer transition-all h-full flex flex-col ${isSelected ? "ring-2 ring-primary" : "hover:border-primary/50"
                }`}
            onClick={() => clickAction(resource, !isSelected)}
        >
            {/* Selection indicator */}
            <div
                className={`absolute top-3 right-3 z-10 w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted border"
                    }`}
            >
                {isSelected && <Check className="h-3 w-3" />}
            </div>

            <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    {resource.type === "QUIZ" && <div className="text-primary font-bold text-xl">Q</div>}
                    {resource.type === "LESSON_PLAN" && <BookOpen className="h-6 w-6 text-primary" />}
                    {resource.type === "PDF" && <FileText className="h-6 w-6 text-primary" />}
                    {resource.type === "IMAGE_SCAN" && <ImageIcon className="h-6 w-6 text-primary" />}
                    {resource.type === "WEBSITE_SCAN" && <Globe className="h-6 w-6 text-primary" />}
                    {resource.type === "TEXT" && <MessageSquare className="h-6 w-6 text-primary" />}
                </div>
                <CardTitle>{resource.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <Badge variant="outline">
                        {resource.type ? RESOURCE_TYPES[resource.type] : ""}
                    </Badge>
                    {resource.quiz_questions && resource.quiz_questions.length ? (
                        <span className="text-xs text-muted-foreground">{resource.quiz_questions.length} questions</span>
                    ) : null}
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        {resource.type === "PDF" && (
                            <div className="aspect-video rounded-md bg-muted relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                    <Image
                                        src="/placeholder.svg?height=200&width=320&text=PDF+Preview"
                                        alt="PDF preview"
                                        width={320}
                                        height={200}
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        )}

                        {resource.type === "IMAGE_SCAN" && (
                            <div className="aspect-video rounded-md bg-muted relative overflow-hidden">
                                <Image
                                    src="/placeholder.svg?height=200&width=320"
                                    alt="Image preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {resource.type === "WEBSITE_SCAN" && (
                            <div className="aspect-video rounded-md bg-muted relative overflow-hidden border">
                                <div className="absolute top-0 left-0 right-0 h-6 bg-muted-foreground/10 flex items-center px-2">
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground/20 mr-1"></div>
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground/20 mr-1"></div>
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground/20"></div>
                                </div>
                                <div className="absolute top-6 inset-x-0 bottom-0 p-4">
                                    <div className="w-full h-2 bg-muted-foreground/20 rounded mb-2 max-w-[80%]"></div>
                                    <div className="w-full h-1 bg-muted-foreground/20 rounded mb-1 max-w-[60%]"></div>
                                    <div className="w-full h-1 bg-muted-foreground/20 rounded max-w-[70%]"></div>
                                </div>
                            </div>
                        )}

                        {resource.type === "TEXT" && (
                            <div className="aspect-video rounded-md bg-muted p-4 overflow-hidden">
                                <p className="text-xs line-clamp-6">{resource.value}</p>
                            </div>
                        )}

                        {resource.type === "IMAGE_SCAN" && resource.value && (
                            <div className="mt-4">
                                <p className="text-xs text-muted-foreground line-clamp-2">{resource.value}</p>
                            </div>
                        )}
                        {resource.type === "QUIZ" && resource.quiz_questions && resource.quiz_questions.length > 0 ?
                            <div className="aspect-video rounded-md bg-muted p-4">

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-medium mb-1">Question 1:</p>
                                        <p className="text-xs">{resource.quiz_questions[0].question}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs text-muted-foreground">{resource.quiz_questions[0].answer}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium">{resource.expected_duration ? resource.expected_duration + " minutes" : ""}  </p>
                                    </div>
                                </div>

                            </div> : null
                        }

                        {resource.type === "LESSON_PLAN" && (
                            <div className="aspect-video rounded-md bg-muted p-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-medium">Preview:</p>
                                        <ul className="text-xs space-y-1 mt-1 list-disc list-inside text-muted-foreground">
                                            <p>{(resource.value.substring(0, 200))}...</p>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium">{resource.expected_duration}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Modified: {new Date(resource.created_at || "").toLocaleString('en-GB')}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="mt-auto pt-4 max-w-full">
                {children}
            </CardFooter>
        </Card>);
}

export default ResourceCard;
import { RESOURCE_TYPES } from "@/types/constants";
import { Resource } from "@/types/resourceTypes";
import { HStack } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react/badge";
import { Button } from "@chakra-ui/react/button";
import { Card } from "@chakra-ui/react/card";
import { BookOpen, Eye, Check, FileText, ImageIcon, Globe, MessageSquare } from "lucide-react"
import { ReactNode } from "react";

type ResourceCardProps = {
    resource: Resource;
    isSelected: boolean;
    clickAction: (resource: Resource, state: boolean) => void;
    children: ReactNode
}

export const ResourceCard = (props: ResourceCardProps) => {
    const { resource, isSelected, clickAction, children } = props;
    return (
        <Card.Root
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

            <Card.Header className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    {resource.type === "QUIZ" && <div className="text-primary font-bold text-xl">Q</div>}
                    {resource.type === "LESSON_PLAN" && <BookOpen className="h-6 w-6 text-primary" />}
                    {resource.type === "PDF" && <FileText className="h-6 w-6 text-primary" />}
                    {resource.type === "IMAGE_SCAN" && <ImageIcon className="h-6 w-6 text-primary" />}
                    {resource.type === "WEBSITE_SCAN" && <Globe className="h-6 w-6 text-primary" />}
                    {resource.type === "TEXT" && <MessageSquare className="h-6 w-6 text-primary" />}
                </div>
                <Card.Title>{resource.name}</Card.Title>
                <Card.Description className="flex items-center gap-2">
                    <Badge variant="outline">
                        {resource.type ? RESOURCE_TYPES[resource.type] : ""}
                    </Badge>
                    {resource.quiz_questions && resource.quiz_questions.length ? (
                        <span className="text-xs text-muted-foreground">{resource.quiz_questions.length} questions</span>
                    ) : null}
                </Card.Description>
            </Card.Header>
            <Card.Body className="pb-2 flex-grow">
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        {resource.type === "QUIZ" && (
                            <div className="aspect-video rounded-md bg-muted p-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-medium mb-1">Question 1:</p>
                                        <p className="text-xs">What is the main benefit of our premium plan?</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full border border-muted-foreground/30"></div>
                                            <p className="text-xs text-muted-foreground">Faster processing</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full border border-muted-foreground/30 bg-primary"></div>
                                            <p className="text-xs text-muted-foreground">Unlimited storage</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full border border-muted-foreground/30"></div>
                                            <p className="text-xs text-muted-foreground">24/7 support</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {resource.type === "LESSON_PLAN" && (
                            <div className="aspect-video rounded-md bg-muted p-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-medium">Learning Objectives:</p>
                                        <ul className="text-xs space-y-1 mt-1 list-disc list-inside text-muted-foreground">
                                            <li>Understand company policies and procedures</li>
                                            <li>Learn to use internal tools and systems</li>
                                            <li>Complete required compliance training</li>
                                            <li>Meet key team members and departments</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium">Duration: 2 weeks</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">Modified: {new Date(resource.created_at || "").toLocaleString('en-GB')}</p>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="mt-auto pt-4 max-w-full">
                {children}
            </Card.Footer>
        </Card.Root>);
}

export default ResourceCard;
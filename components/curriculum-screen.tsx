import lessons from "@/lib/lessons"
import { Separator } from "@/components/ui/separator"
import { FC } from "react"
import { LessonMenu } from "./lesson-menu"
import { usePromptEditorState } from "@/store/editorStore"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { ContentSection } from "./content-section"

export const CurriculumScreen: FC = ({}) => {
    const lessonIndex = usePromptEditorState((state) => state.lessonIndex);
    const contentIndex = usePromptEditorState((state) => state.contentIndex);

    return <>
        <Tabs defaultValue="Lesson 1" className="flex flex-col w-1/3 m-2 drop-shadow-md rounded-xl">
            <TabsList className="space-x-1">
                {lessons.map((_, index) => (
                    <TabsTrigger className="w-full" key={index} value={`Lesson ${index + 1}`}>
                        {`Lesson ${index + 1}`}
                    </TabsTrigger>
                ))}
            </TabsList>
            {lessons.map((_, index) => (
            <TabsContent key={index} value={`Lesson ${index + 1}`} className="h-full">
                <div className="flex flex-col items-center justify-between bg-background p-5 h-full rounded-xl">
                    <span>
                        <h1 className="text-4xl font-bold mb-1">
                            {lessons[index].title}
                        </h1>
                        <h4 className="text-xl text-muted">
                            {lessons[index].description}
                        </h4>
                    </span>
                    <div className="flex flex-col flex-grow pt-10">
                        {lessons[index].content.filter((val, i) => i <= contentIndex).map((content, index) => (
                            <ContentSection key={index} checked={index < contentIndex} content={content}/>
                        ))}
                    </div>
                </div>
            </TabsContent>))}
        </Tabs>
    </>
}
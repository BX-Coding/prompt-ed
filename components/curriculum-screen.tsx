import lessons from "@/lib/lessons"
import { Separator } from "@/components/ui/separator"
import { FC, useState } from "react"
import { LessonMenu } from "./lesson-menu"
import { usePromptEditorState } from "@/store/editorStore"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { ContentSection } from "./content-section"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { ArrowRightIcon } from "lucide-react"

export const CurriculumScreen: FC = ({}) => {
    const lessonIndex = usePromptEditorState((state) => state.lessonIndex);
    const setLessonIndex = usePromptEditorState((state) => state.setLessonIndex);
    const contentIndex = usePromptEditorState((state) => state.contentIndex);
    const setContentIndex = usePromptEditorState((state) => state.setContentIndex);

    const onTabChange = (value: string) => {
        const lessonNumber = parseInt(value.split(" ")[1]);
        setLessonIndex(lessonNumber);
    }

    const incrementLessonIndex = () => {
        setLessonIndex((lessonIndex % lessons.length) + 1);
    }

    return <>
        <Tabs value={`Lesson ${lessonIndex}`} onValueChange={onTabChange} defaultValue="Lesson 1" className="flex flex-col w-1/3 m-2 drop-shadow-md rounded-xl h-full  ">
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
                    <div className="flex flex-col flex-grow pt-10 space-y-2">
                        {lessons[index].content.filter((val, i) => i <= contentIndex).map((content, index, arr) => (
                            <ContentSection key={index} last={index==lessons[index].content.length-1} checked={index < contentIndex} content={content}/>
                        ))}
                    </div>
                    <LessonButtons nextLesson={() => {
                        incrementLessonIndex()
                        setContentIndex(0)
                    }}/>
                </div>
            </TabsContent>))}
        </Tabs>
    </>
}

type LessonButtonsProps = {
    nextLesson: () => void
}

const LessonButtons: FC<LessonButtonsProps> = ({nextLesson}) => {
    const setContentIndex = usePromptEditorState((state) => state.setContentIndex);

    const onResetClick = () => {
        setContentIndex(0);
    }

    return (
        <div className="flex flex-row w-full justify-between">
            <Button onClick={onResetClick}><ReloadIcon/></Button>
            <Button onClick={nextLesson}><ArrowRightIcon/></Button>
        </div>
    );
}
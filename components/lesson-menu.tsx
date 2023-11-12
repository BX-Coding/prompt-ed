import { FC } from "react";
import lessons, { LessonEntry } from "@/lib/lessons";
import { usePromptEditorState } from "@/store/editorStore";

export const LessonMenu: FC = ({}) => {
  const lesson_entries = lessons as LessonEntry[];
  const setLessonIndex = usePromptEditorState((state) => state.setLessonIndex);
  const size = 20;
  return (
    <div className="flex flex-col items-left bg-primary text-foreground p-1 rounded-md">
      {lessons.map((lesson, index) => (
        <a key={index} onClick={(event) => setLessonIndex(index)}>
          <div className="bg-primary text-left text-lg">
            {index + 1}. {lesson.title}
          </div>
        </a>
      ))}
    </div>
  );
};

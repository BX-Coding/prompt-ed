import { FC } from "react";
import lessons, { LessonEntry } from "@/lib/lessons";

export const LessonMenu: FC = ({}) => {
  const lesson_entries = lessons as LessonEntry[];
  const size = 20;
  return (
    <div className="flex flex-row items-center bg-secondary text-foreground p-1 rounded-md">
      {lessons.map((lesson, index) => (
        <div key={index}>{lesson.description}</div>
      ))}
    </div>
  );
};

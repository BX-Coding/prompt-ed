import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { BuildableType } from '@/components/buildable'

export type BuildableState = {
    id: string,
    type: BuildableType,
    value: string,
    options?: BuildableTagOption[],
}

type BuildableTagOption = {
    [key: string]: string,
}

interface PromptEditorState {
    buildables: BuildableState[],
    lessonIndex: number,
    contentIndex: number,
    addBuildable: (buildableType: BuildableType, value: string, options?: BuildableTagOption[]) => void,
    removeBuildable: (buildableId: string) => void,
    updateBuildable: (buildableId: string, value: string) => void,
    setBuildables: (setBuildables: (prevBuildables: BuildableState[]) => BuildableState[]) => void,
    setLessonIndex: (lessonIndex: number) => void,
    setContentIndex: (contentIndex: number) => void
}

export const usePromptEditorState = create<PromptEditorState>()(
  devtools(
    persist(
      (set) => ({
        buildables: [],
        lessonIndex: 0,
        contentIndex: 0,
        addBuildable: (buildableType: BuildableType, value: string, options?: BuildableTagOption[]) => set(state => ({ buildables: [...state.buildables, { id: Math.random().toString(36).substring(7), type: buildableType, value, options }] })),
        removeBuildable: (buildableId: string) => set(state => ({ buildables: state.buildables.filter(buildable => buildable.id !== buildableId) })),
        updateBuildable: (buildableId: string, value: string) => set(state => ({ buildables: state.buildables.map(buildable => buildable.id === buildableId ? { ...buildable, value } : buildable) })),
        setBuildables: (setBuildables: (prevBuildables: BuildableState[]) => BuildableState[]) => set(state => ({ buildables: setBuildables(state.buildables) })),
        setLessonIndex: (lessonIndex: number) => set(state => ({lessonIndex: lessonIndex})),
        setContentIndex: (contentIndex: number) => set(state => ({contentIndex: contentIndex}))
      }),
      {
        name: 'prompt-editor',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
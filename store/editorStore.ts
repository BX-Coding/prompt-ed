import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { BuildableType } from '@/components/buildable'

export type BuildableState = {
    id: string,
    type: BuildableType,
    value: string,
}

interface PromptEditorState {
    buildables: BuildableState[],
    addBuildable: (buildableType: BuildableType, value: string) => void,
    removeBuildable: (buildableId: string) => void,
    updateBuildable: (buildableId: string, value: string) => void,
    setBuildables: (setBuildables: (prevBuildables: BuildableState[]) => BuildableState[]) => void,
}

export const usePromptEditorState = create<PromptEditorState>()(
  devtools(
    persist(
      (set) => ({
        buildables: [],
        addBuildable: (buildableType: BuildableType, value: string) => set(state => ({ buildables: [...state.buildables, { id: `${buildableType}-${state.buildables.length}`, type: buildableType, value }] })),
        removeBuildable: (buildableId: string) => set(state => ({ buildables: state.buildables.filter(buildable => buildable.id !== buildableId) })),
        updateBuildable: (buildableId: string, value: string) => set(state => ({ buildables: state.buildables.map(buildable => buildable.id === buildableId ? { ...buildable, value } : buildable) })),
        setBuildables: (setBuildables: (prevBuildables: BuildableState[]) => BuildableState[]) => set(state => ({ buildables: setBuildables(state.buildables) })),
      }),
      {
        name: 'prompt-editor',
      }
    )
  )
)
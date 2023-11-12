import { usePromptEditorState } from "@/store/editorStore"

export const usePrompt = () => {
    const buildables = usePromptEditorState(state => state.buildables)

    const constructPrompt = () => {
        return buildables.reduce((prompt, buildable) => {
            return prompt + buildable.value.trim() + " "
        }, "")
    }

    return { constructPrompt }
}
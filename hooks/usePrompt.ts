import { usePromptEditorState } from "@/store/editorStore";

export const usePrompt = () => {
  const buildables = usePromptEditorState((state) => state.buildables);
  const setBuildables = usePromptEditorState((state) => state.setBuildables);
  const addBuildable = usePromptEditorState((state) => state.addBuildable);

  const constructPrompt = () => {
    return buildables.reduce((prompt, buildable) => {
      return prompt + buildable.value.trim() + " ";
    }, "");
  };

  const resetPrompt = () => {
    setBuildables(() => []);
  };

  const addTextBlock = (text: string) => {
    addBuildable("free_input", text);
  };

  return { constructPrompt, resetPrompt, addTextBlock };
};

import React from "react";
import ScratchBlocks from "./scratch-blocks";

interface Props {
  llmResponse: string;
}

const extractParts = (
  responseText: string
): { nonCode: string; code: string | null } => {
  const codePattern = /```(.*?)```/s;
  const match = responseText.match(codePattern);

  if (match) {
    const nonCode = responseText.replace(codePattern, "").trim();
    const code = match[1].trim();
    return { nonCode, code };
  } else {
    return { nonCode: responseText.trim(), code: null };
  }
};

const EmbeddedMessage: React.FC<Props> = ({ llmResponse }) => {
  const { nonCode, code } = extractParts(llmResponse);

  return (
    <>
      <p>{nonCode}</p>
      {code ? <ScratchBlocks code={code} /> : null}
    </>
  );
};

export default EmbeddedMessage;

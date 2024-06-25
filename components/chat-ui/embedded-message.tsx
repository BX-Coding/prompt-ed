import React from "react";
import ScratchBlocks from "./scratch-blocks";

interface Props {
  llmResponse: string;
}

const extractParts = (
  responseText: string
): { nonCode: (string | JSX.Element)[]; code: string | null } => {
  const codePattern = /```(.*?)```/s;
  const parts: (string | JSX.Element)[] = [];
  let match;

  while ((match = codePattern.exec(responseText)) !== null) {
    const nonCode = responseText.substring(0, match.index).trim();
    if (nonCode) {
      parts.push(nonCode);
    }

    const code = match[1].trim();
    parts.push(<ScratchBlocks key={code} code={code} />);

    responseText = responseText.substring(match.index + match[0].length);
  }

  if (responseText.trim()) {
    parts.push(responseText.trim());
  }

  return { nonCode: parts, code: null };
};

const EmbeddedMessage: React.FC<Props> = ({ llmResponse }) => {
  const { nonCode, code } = extractParts(llmResponse);

  return (
    <>
      {nonCode.map((part, index) => (
        <p key={index}>{part}</p>
      ))}
    </>
  );
};

export default EmbeddedMessage;

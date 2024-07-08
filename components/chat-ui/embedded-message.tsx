import React from "react";
import ScratchBlocks from "./scratch-blocks";
import Code from "./code";

interface Props {
  llmResponse: string;
  scratchBlocksReady:boolean
}

const generatePreHash = (length: number = 5): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let hashCode = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      hashCode += characters.charAt(randomIndex);
  }
  return hashCode;
}

const extractParts = (
  responseText: string,
  scratchBlocksReady:boolean
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
    parts.push(code.startsWith("scratch") ? <ScratchBlocks scratchBlocksReady={scratchBlocksReady} key={code} preHash={generatePreHash()} code={code} /> : <Code code={code} />);

    responseText = responseText.substring(match.index + match[0].length);
  }

  if (responseText.trim()) {
    parts.push(responseText.trim());
  }

  return { nonCode: parts, code: null };
};

const EmbeddedMessage: React.FC<Props> = ({ llmResponse, scratchBlocksReady }) => {
  const { nonCode, code } = extractParts(llmResponse, scratchBlocksReady);

  return (
    <>
      {nonCode.map((part, index) => (
        <p className="text-chat text-text-p1" key={index}>{part}</p>
      ))}
    </>
  );
};

export default EmbeddedMessage;

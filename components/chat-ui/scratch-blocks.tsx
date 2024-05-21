import React, { useState, useEffect, useRef } from "react";
import scratchblocks from "scratchblocks";
import Script from "next/script";

interface Props {
  code: string;
}

const ScratchBlocks: React.FC<Props> = ({ code }) => {
  return (
    <>
      <Script
        src="https://scratchblocks.github.io/js/scratchblocks-v3.6.4-min.js"
        onLoad={() => {
          scratchblocks.renderMatching("pre.blocks", {
            style: "scratch3",
            languages: ["en"],
            scale: 1,
          });
        }}
      />

      <pre className="blocks">{code}</pre>
    </>
  );
};

export default ScratchBlocks;

import React, { useState, useEffect, useRef } from "react";
import scratchblocks from "scratchblocks";
import Script from "next/script";

// To switch scratchblocks package over to NPM package, comment out the script tag from line 14 to 23 and uncomment the useEffect

interface Props {
  code: string;
}

const ScratchBlocks: React.FC<Props> = ({ code }) => {
  // useEffect(() => {
  //   scratchblocks.renderMatching("pre.blocks", {
  //     style: "scratch3",
  //     languages: ["en"],
  //     scale: 1,
  //   });
  // });
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

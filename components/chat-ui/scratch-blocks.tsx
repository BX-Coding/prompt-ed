import React, { useState, useEffect, useRef } from "react";
// import scratchblocks from 'scratchblocks';
import Script from "next/script";

// To switch scratchblocks package over to NPM package, comment out the script tag from line 14 to 23 and the import then uncomment the useEffect

declare module "scratchblocks" {
  interface RenderOptions {
    style: "scratch3" | "scratch2" | null;
    languages: string[] | null;
    scale: number | null;
    inline: boolean | null;
  }

  export function renderMatching(
    selector: string,
    options: RenderOptions
  ): void;
}

declare const scratchblocks: any;

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
            inline: false,
          });
        }}
      />

      <pre className="blocks">{`${code}`}</pre>
    </>
  );
};

export default ScratchBlocks;

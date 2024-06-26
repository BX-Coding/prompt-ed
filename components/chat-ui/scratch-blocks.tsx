import React, { useState, useEffect, useRef } from "react";

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
  preHash:string
  scratchBlocksReady:boolean
}

const ScratchBlocks: React.FC<Props> = ({ code, preHash, scratchBlocksReady }) => {
  let count = 0
  useEffect(()=>{
    if(count==0 && scratchBlocksReady==true){
      scratchblocks.renderMatching(`pre.${preHash}`, {
        style: "scratch3",
        languages: ["en"],
        scale: 1,
        inline: false,
      });
    }
    count++
  },[])

  return (
    <>
      <pre className={preHash}>{`${code}`}</pre>
    </>
  );
};

export default ScratchBlocks;

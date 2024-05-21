declare module "scratchblocks" {
  export interface RenderOptions {
    style: "scratch3" | "scratch2";
    languages: string[];
    scale:number
  }

  export function renderMatching(element: string, options?: RenderOptions): void;
}

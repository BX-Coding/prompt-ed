declare module "scratchblocks" {
  export interface RenderOptions {
    style: "scratch3" | "scratch2" | null;
    languages: string[] | null;
    scale: number | null;
    inline: boolean | null;
  }

  export function renderMatching(
    element: string,
    options?: RenderOptions
  ): void;
}

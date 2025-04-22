import type { VEACTagElement } from "./elements";

type VEACTree = {
    root: VEACTagElement;
    children: Set<VEACTagElement>;
}

export type { VEACTree };


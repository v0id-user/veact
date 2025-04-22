type VEACTagElement = {
    name: string;
    type: "tag";
    attributes?: Record<string, string>;
    children?: VEACTagElement[];
}

export type { VEACTagElement };

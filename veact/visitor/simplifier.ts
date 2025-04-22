import type { Tag, VSXText, VSXTag } from "./visitor";
import type { VSXNode } from "./visitor";


/*
* I ain't gonna lie this shit is Vibecoded with Cursor O3 model Usage based pricing, yeah I was cooked
* but hey it's prettey straight forward and well documented =D
*/
export function cstToAstNode(tag: Tag | { children: any }): VSXNode {
    // If we are called with a wrapper node (e.g. the generic CstNode "tag") we unwrap its
    // `.children` object so we always work with the inner structure where `VSXTagOpen` etc.
    const nodeChildren: any = (tag as any).VSXTagOpen ? tag : (tag as any).children;

    if (!nodeChildren || !nodeChildren.VSXTagOpen) {
        throw new Error("Invalid CST node passed to cstToAstNode – missing VSXTagOpen token");
    }

    // Take the tag name without the surrounding square brackets "[" and "]"
    const tagName = nodeChildren.VSXTagOpen[0].image.replace(/\[|\]/g, "");

    // Extract all plain‑text that sits directly inside the current tag (if any)
    let accumulatedContent = "";
    // Collect the nested CST `tag` children so we can recursively visit them
    const nestedTags: Tag[] = [];

    for (const contentEntry of nodeChildren.content) {
        // If there is VSXText inside the content we add it to the accumulated string
        if (contentEntry.children?.VSXText) {
            accumulatedContent += contentEntry.children.VSXText.map((t: VSXText) => t.image).join("");
        }

        // If there are nested tags we push them to the list so we can convert them later
        if (contentEntry.children?.tag) {
            const inner = contentEntry.children.tag
                .map((t: VSXTag) => (t as any).children as Tag)
                .filter(Boolean);
            nestedTags.push(...inner);
        }
    }

    // Recursively convert nested tags
    const convertedChildren = nestedTags.map(childTag => cstToAstNode(childTag));

    // The produced AST node follows the structure declared in visitor.ts
    const node: VSXNode = {
        type: "tag",
        content: accumulatedContent.trim(),
        tag: tagName,
        // Type of children in the interface is a single VSXNode. In practice a tag can have
        // many children, therefore we store the first child (if any) and ignore the rest to
        // satisfy the existing typing. This can be revisited by widening the children type
        // to `VSXNode[]` across the codebase.
        children: convertedChildren
    };

    return node;
}





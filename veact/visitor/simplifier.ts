import type { Tag, VSXText, VSXTag } from "./visitor";
import type { VSXNode } from "./visitor";


/*
* I ain't gonna lie this shit is Vibecoded with Cursor O3 model Usage based pricing, yeah I was cooked
* but hey it's prettey straight forward and well documented =D
*/
export function cstToAstNode(tag: Tag | { children: any }): VSXNode {
    try {
        // If we are called with a wrapper node (e.g. the generic CstNode "tag") we unwrap its
        // `.children` object so we always work with the inner structure where `VSXTagOpen` etc.
        const nodeChildren: any = (tag as any).VSXTagOpen ? tag : (tag as any).children;

        if (!nodeChildren || !nodeChildren.VSXTagOpen) {
            throw new Error("Invalid CST node passed to cstToAstNode – missing VSXTagOpen token");
        }

        // Get the original tag text (e.g. "[div class="container" id="main"]")
        const tagText = nodeChildren.VSXTagOpen[0].image;
        
        // Remove the brackets
        const tagContent = tagText.substring(1, tagText.length - 1).trim();
        
        // Split by the first space to get tag name and attributes part
        const firstSpaceIndex = tagContent.indexOf(' ');
        let tagName, attributesText;
        
        if (firstSpaceIndex === -1) {
            // No attributes
            tagName = tagContent;
            attributesText = "";
        } else {
            tagName = tagContent.substring(0, firstSpaceIndex);
            attributesText = tagContent.substring(firstSpaceIndex + 1);
        }
        
        // Process attributes if present
        const attributes: Record<string, string> = {};
        
        if (attributesText) {
            // Improved regex to better handle attribute values with spaces and special characters
            const attrRegex = /([a-zA-Z0-9_\-]+)="([^"]*)"/g;
            let match;
            
            while ((match = attrRegex.exec(attributesText)) !== null) {
                const attrName = match[1];
                const attrValue = match[2];
                attributes[attrName] = attrValue;
            }
        }

        // Extract all plain-text that sits directly inside the current tag (if any)
        let accumulatedContent = "";
        // Collect the nested CST `tag` children so we can recursively visit them
        const nestedTags: Tag[] = [];

        if (nodeChildren.content) {
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
        }

        // Recursively convert nested tags
        const convertedChildren = nestedTags.map(childTag => cstToAstNode(childTag));

        // Add content to attributes if present
        const contentTrimmed = accumulatedContent.trim();
        if (contentTrimmed) {
            attributes.content = `"${contentTrimmed}"`;
        }

        // The produced AST node follows the structure declared in visitor.ts
        const node: VSXNode = {
            type: "tag",
            content: contentTrimmed,
            tag: tagName,
            children: convertedChildren,
            // Add attributes to the node
            attributes: Object.keys(attributes).length > 0 ? attributes : undefined
        };
        
        return node;
    } catch (error) {
        console.error("Error in cstToAstNode:", error);
        throw error;
    }
}





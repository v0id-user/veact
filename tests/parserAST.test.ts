import { test, expect } from "bun:test";
import VSXASTParser from "@/veact/parser/ast";
import type { VEACTagElement } from "@/veact/types/elements";

test("parserAST", () => {
    const parser = new VSXASTParser();
    const vreactCodeNoStrip = `
        Index {
            (
            [div] 
                Hey
                [h1]Hello World[/h1]
                [h1]This is veact[/h1]
                [div] 
                    [h1]Hello World nested[/h1]
                [/div]
            [/div]
            )
        }
    `;
    const ast = parser.parse(vreactCodeNoStrip)
    
    // Log the AST tree for debugging
    console.log("Full AST Tree:", JSON.stringify(ast.astTree, null, 2));
    
    console.log("\n--- AST Hierarchy ---");
    
    // Use a stack to traverse the tree iteratively
    // TODO: Work on the compiler and use this type...
    const stack: Array<{element: VEACTagElement, depth: number}> = [{
        element: ast.root,
        depth: 0
    }];

    while (stack.length > 0) {
        const {element, depth} = stack.pop()!;
        const indent = '  '.repeat(depth);
        const content = element.attributes?.content ? ` (${element.attributes.content})` : '';
        console.log(`${indent}${element.name}${content}`);
        
        // Push children to stack in reverse order so they print in correct order
        if (element.children && element.children.length > 0) {
            for (let i = element.children.length - 1; i >= 0; i--) {
                stack.push({
                    element: element.children[i],
                    depth: depth + 1
                });
            }
        }
    }

    console.log("-------------------\n");
    
    // Add basic assertions to verify the structure
    expect(ast.root.name).toBe("div");
    expect(ast.children.length).toBeGreaterThan(0);
    expect(ast.root.children?.length).toBeGreaterThan(0);
});

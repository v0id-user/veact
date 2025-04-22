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
    
    // Convert the full tree to a friendly format for output
    const fullTree = {
        root: ast.root,
        childrenCount: ast.children.length,
        allElements: [
            ast.root,
            ...ast.children
        ]
    };
    
    console.log("Full AST Tree:", JSON.stringify(fullTree, null, 2));
    
    // Add detailed logging at all levels of the tree
    console.log("\n--- AST Hierarchy ---");
    function printTree(element: VEACTagElement, depth = 0) {
        const indent = '  '.repeat(depth);
        const content = element.attributes?.content ? ` (${element.attributes.content})` : '';
        console.log(`${indent}${element.name}${content}`);
        
        if (element.children && element.children.length > 0) {
            element.children.forEach(child => printTree(child, depth + 1));
        }
    }
    
    printTree(ast.root);
    console.log("-------------------\n");
    
    // Add basic assertions to verify the structure
    expect(ast.root.name).toBe("div");
    expect(ast.children.length).toBeGreaterThan(0);
    expect(ast.root.children?.length).toBeGreaterThan(0);
});

import VSXASTParser from "@/veact/parser/ast";
import type { VEACTagElement } from "@/veact/types/elements";

function compile(vex: string) {
    const parser = new VSXASTParser();
    const ast = parser.parse(vex)
    const stack: Array<{element: VEACTagElement, depth: number}> = [{
        element: ast.root,
        depth: 0
    }];

    while (stack.length > 0) {
        // TODO: Then transfer the javascript hooks to scripts and inject them in the DOM
        // Transfer Veact elements to HTML elements and spit out the result

        const {element, depth} = stack.pop()!;
        const indent = '  '.repeat(depth);
        const content = element.attributes?.content ? ` (${element.attributes.content})` : '';
        console.log(`${indent}${element.name}${content}`);
        
    }
}

import { test, expect } from "bun:test";
import VSXASTParser from "@/veact/parser/ast";
test("parserAST", () => {
    const parser = new VSXASTParser();
    const vreactCodeNoStrip = `
        Index {
            (
            [div] 
                [h1]Hello World[/h1]
            [/div]
            )
        }
    `;
    const ast = parser.parse(vreactCodeNoStrip)
    console.log(ast)
});

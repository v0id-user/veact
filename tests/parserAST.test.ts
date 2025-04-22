import { test, expect } from "bun:test";
import VSXASTParser from "@/veact/parser/ast";
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
    console.log(ast)
});

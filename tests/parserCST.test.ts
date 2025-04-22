import VSXCSTParser from "@/veact/parser/cst"
import vreactLexer from "@/veact/parser/lexer"
import { strip } from "@/utils/strip"
import { test, expect } from "bun:test"

test("testParser", () => {
    const parserCST = new VSXCSTParser()
    const vreactCode = strip(`
        Index {
            (
            [div] 
                [h1]Hello World[/h1]
            [/div]
            )
        }
    `);

    // Test full function parsing
    const tokens = vreactLexer.tokenize(vreactCode)
    parserCST.input = tokens.tokens
    const functionCst = parserCST.function()
    expect(functionCst).toBeDefined()
    expect(parserCST.errors.length).toBeLessThanOrEqual(0)
    
    // Test function body parsing
    const bodyCode = strip(`
        (
            [div] 
                [h1]Hello World[/h1]
            [/div]
        )
    `)
    const bodyTokens = vreactLexer.tokenize(bodyCode)
    parserCST.input = bodyTokens.tokens
    const functionBodyCst = parserCST.functionBody()
    expect(functionBodyCst).toBeDefined()
    expect(parserCST.errors.length).toBeLessThanOrEqual(0)

    // Test content parsing
    const contentCode = strip(`
        [div] 
            [h1]Hello World[/h1]
        [/div]
    `)
    const contentTokens = vreactLexer.tokenize(contentCode)
    parserCST.input = contentTokens.tokens
    const contentCst = parserCST.content()
    expect(contentCst).toBeDefined()
    expect(parserCST.errors.length).toBeLessThanOrEqual(0)

    console.log(functionCst)
    console.log(functionBodyCst)
    console.log(contentCst)
})

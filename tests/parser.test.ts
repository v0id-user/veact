import VEXParser from "@/parser/grammer"
import vreactLexer from "@/parser/lexer"
import { strip } from "@/utils/strip"
import { test, expect } from "bun:test"

test("testParser", () => {
    const parser = new VEXParser()
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
    parser.input = tokens.tokens
    const functionCst = parser.function()
    expect(functionCst).toBeDefined()
    expect(parser.errors.length).toBeLessThanOrEqual(0)
    
    // Test function body parsing
    const bodyCode = strip(`
        (
            [div] 
                [h1]Hello World[/h1]
            [/div]
        )
    `)
    const bodyTokens = vreactLexer.tokenize(bodyCode)
    parser.input = bodyTokens.tokens
    const functionBodyCst = parser.functionBody()
    expect(functionBodyCst).toBeDefined()
    expect(parser.errors.length).toBeLessThanOrEqual(0)

    // Test content parsing
    const contentCode = strip(`
        [div] 
            [h1]Hello World[/h1]
        [/div]
    `)
    const contentTokens = vreactLexer.tokenize(contentCode)
    parser.input = contentTokens.tokens
    const contentCst = parser.content()
    expect(contentCst).toBeDefined()
    expect(parser.errors.length).toBeLessThanOrEqual(0)
})

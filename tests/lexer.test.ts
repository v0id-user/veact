import vreactLexer from "@/veact/parser/lexer"
import { strip } from "@/utils/strip"
import { test } from "bun:test"

test("testLexer", () => {
    const lexer = vreactLexer
    const vreactCode = strip(`
    Index {
        (
        [div] 
            [h1]Hello World[/h1]
        [/div]
        )
    }
    `)
    console.log(vreactCode)
    const tokens = lexer.tokenize(vreactCode)
    console.log(tokens)
})


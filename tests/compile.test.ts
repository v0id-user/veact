import { compileVsx } from "@/veact/compiler"
import { expect, test } from "bun:test"

test("testCompile", () => {
    const vsx = `
    Index {
        (
        [div] 
            [h1]Hello World[/h1]
        [/div]
        )
    }
    `

    const compiled = compileVsx(vsx)
    expect(compiled).toContain("<div>");
    console.log(compiled)
})

test("testAttributesWithSpaces", () => {
    const vsx = `
    Index {
        (
        [div style="color: red; margin: 10px;" class="container main-content"] 
            [h1]Styled Content[/h1]
        [/div]
        )
    }
    `

    const compiled = compileVsx(vsx)
    expect(compiled).toContain('style="color: red; margin: 10px;"');
    expect(compiled).toContain('class="container main-content"');
    console.log(compiled)
})


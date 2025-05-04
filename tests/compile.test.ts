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


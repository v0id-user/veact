import { test, expect } from "bun:test";
import { compileVsx } from "@/veact/compiler/compil";
import * as fs from 'fs';

test("compiler handles attributes correctly", () => {
    // Read the sample vsx file with attributes
    const vsxContent = fs.readFileSync('./tests/attributes.vsx', 'utf-8');
    
    // Compile to HTML
    const html = compileVsx(vsxContent);
    
    // Verify that attributes are preserved
    expect(html).toContain('<div class="container" id="main">');
    expect(html).toContain('<h1 class="title" style="color: blue;">');
    expect(html).toContain('<p class="description" data-info="test">');
    
    // Verify content is preserved
    expect(html).toContain('Hello World with Attributes');
    expect(html).toContain('This is a paragraph with attributes');
    
    // Log the HTML for manual verification
    console.log("Compiled HTML with attributes:\n", html);
}); 
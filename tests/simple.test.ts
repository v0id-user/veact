import { test, expect } from "bun:test";
import { compileVsx } from "@/veact/compiler/compil";
import * as fs from 'fs';

test("compiler handles simple VSX", () => {
    // Read the simple vsx file
    const vsxContent = fs.readFileSync('./tests/simple.vsx', 'utf-8');
    
    // Compile to HTML
    const html = compileVsx(vsxContent);
    
    // Verify basic structure
    expect(html).toContain("<div>");
    expect(html).toContain("<h1>");
    expect(html).toContain("Hello");
    expect(html).toContain("</h1>");
    expect(html).toContain("</div>");
    
    // Log the HTML for manual verification
    console.log("Compiled HTML (simple):\n", html);
}); 
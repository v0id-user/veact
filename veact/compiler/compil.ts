import VSXASTParser from "@/veact/parser/ast";
import type { VEACTagElement } from "@/veact/types/elements";

export function compileVsx(vsx: string) {
    const parser = new VSXASTParser();
    const ast = parser.parse(vsx);
    
    // Generate HTML using recursive approach
    let htmlOutput = generateHtml(ast.root, 0);
    
    // Print the HTML to console
    console.log("--- Generated HTML ---");
    console.log(htmlOutput);
    console.log("-----------------------------");
    
    return htmlOutput;
}

// Helper function to recursively generate HTML
function generateHtml(element: VEACTagElement, depth: number): string {
    const indent = '  '.repeat(depth);
    const tagName = element.name;
    const attributes = element.attributes || {};
    
    // Build HTML attributes string (excluding content)
    const attributeString = Object.entries(attributes)
        .filter(([key]) => key !== 'content')
        .map(([key, value]) => ` ${key}="${value}"`)
        .join('');
    
    // Start tag
    let html = `${indent}<${tagName}${attributeString}>`;
    
    // Track if we need a newline before closing tag
    let needNewline = false;
    
    // Add content if it exists
    if (attributes.content) {
        // Remove quotes from content
        const content = attributes.content.replace(/^"(.*)"$/, '$1');
        html += `\n${indent}  ${content}`;
        needNewline = true;
    }
    
    // Process children
    if (element.children && element.children.length > 0) {
        needNewline = true;
        html += '\n';
        
        // Generate HTML for each child
        for (const child of element.children) {
            html += generateHtml(child, depth + 1);
        }
    }
    
    // Close tag (with proper indentation if needed)
    if (needNewline) {
        html += `\n${indent}</${tagName}>\n`;
    } else {
        html += `</${tagName}>\n`;
    }
    
    // Log the conversion for visualization
    console.log(`${indent}${tagName} -> <${tagName}${attributeString}>`);
    
    return html;
}

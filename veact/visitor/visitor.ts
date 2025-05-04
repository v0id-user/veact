import VSXCSTParser from "@/veact/parser/cst";
import type { CstNode, IToken } from "chevrotain";
import { cstToAstNode } from "./simplifier";

const $ = new VSXCSTParser()
const BaseVisitor = $.getBaseCstVisitorConstructor()

type FunctionContext = {
    functionBody: CstNode;
    content: CstNode;
    tag: CstNode;
};


// CST
export interface VSXTagOpen extends IToken {
}

export interface VSXTagClose extends VSXTagOpen {}

export interface VSXText extends VSXTagOpen {}

export interface VSXContent extends IToken {
    name: string;
    children: {
        VSXText?: VSXText[];
        tag?: VSXTag[];
    };
}

export interface VSXTag extends CstNode {
    name: string;
    children: {
        VSXTagOpen: VSXTagOpen[];
        content: VSXContent[];
        VSXTagClose: VSXTagClose[];
    };
}

export interface Tag extends CstNode {
    VSXTagOpen: VSXTagOpen[];
    content: VSXContent[];
    VSXTagClose: VSXTagClose[];
}


// AST
export interface VSXNode {
    type: string;
    content: string;
    tag: string;
    children: VSXNode[];
    attributes?: Record<string, string>;
}

class VSXVisitor extends BaseVisitor {
    constructor() {
        super()
        this.validateVisitor();
    }

    function(ctx: FunctionContext) {
        console.log("Function context:", JSON.stringify(ctx, null, 2));
        return this.visit(ctx.functionBody)
    }

    functionBody(ctx: FunctionContext) {
        console.log("Function body context:", JSON.stringify(ctx, null, 2));
        // TODO: Here can be some Javascript hooks to be parsed inside the visitor
        return this.visit(ctx.content)
    }

    content(ctx: FunctionContext) {
        console.log("Content context:", JSON.stringify(ctx, null, 2));
        
        const contentCtx = ctx as unknown as { 
            tag?: Array<any>;
            VSXText?: Array<{ image: string }>;
        };
        
        // Check if there's a tag 
        if (contentCtx.tag && contentCtx.tag.length > 0) {
            return this.visit(contentCtx.tag[0]);
        }
        
        // If no direct tag, extract text content
        if (contentCtx.VSXText && contentCtx.VSXText.length > 0) {
            return {
                type: "text",
                content: contentCtx.VSXText.map(t => t.image).join(""),
                tag: "text",
                children: []
            };
        }
        
        // Return an empty node if no content
        return {
            type: "tag",
            content: "",
            tag: "unknown",
            children: []
        };
    }

    tag(ctx: FunctionContext) {
        const root = ctx as unknown as Tag;
        // Debug what the visitor receives
        console.log("Tag ctx:", JSON.stringify(root, null, 2));
        const astNode = cstToAstNode(root);
        // Debug what the visitor returns
        console.log("AST Node:", JSON.stringify(astNode, null, 2));
        return astNode;
    }
}

export default VSXVisitor;

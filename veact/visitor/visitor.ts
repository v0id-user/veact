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
}

interface VSXASTTree {
    root: VSXNode;
    children: Set<VSXNode>;
}

class VSXVisitor extends BaseVisitor {
    constructor() {
        super()
        this.validateVisitor();
    }

    function(ctx: FunctionContext) {
        return this.visit(ctx.functionBody)
    }

    functionBody(ctx: FunctionContext) {
        // TODO: Here can be some Javascript hooks to be parsed inside the visitor
        return this.visit(ctx.content)
    }

    content(ctx: FunctionContext) {
        // Here we parse vreact tags or text
        return this.visit(ctx.tag)
    }

    tag(ctx: FunctionContext) {
        const root = ctx as unknown as Tag;
        console.log("Visited <tag> rule ctx:", JSON.stringify(root, null, 2));
        return cstToAstNode(root);
    }
}

export default VSXVisitor;

import VSXVisitor from "@/veact/visitor";
import type { VEACTree } from "@/veact/types/tree";
import VSXCSTParser from "./cst";
import vreactLexer from "./lexer";
import { strip } from "@/utils/strip";
export default class VSXASTParser {
    private visitor: VSXVisitor;

    constructor() {
        this.visitor = new VSXVisitor();
    }

    public parse(code: string): VEACTree {
        // First strip the code and tokenize the code
        const tokens = vreactLexer.tokenize(strip(code));
        
        // Second parse the tokens into a CST
        const parser = new VSXCSTParser();
        parser.input = tokens.tokens;
        const cst = parser.function();

        // Third visit the CST and return the AST
        const tree = this.visitor.visit(cst);
        return tree;
    }
}


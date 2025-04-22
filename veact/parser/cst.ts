import { CstParser, type CstNode, type ParserMethod } from "chevrotain";
import {
    tokens,
    FunctionName,
    LCurly,
    RCurly,
    LParen,
    RParen,
    VSXTagOpen,
    VSXTagClose,
    VSXText
} from "./tokens";

class VSXCSTParser extends CstParser {

    // Declare all rules as properties so typescript knows about them
    public function!: ParserMethod<unknown[], CstNode>;
    public functionBody!: ParserMethod<unknown[], CstNode>;
    public content!: ParserMethod<unknown[], CstNode>;
    public tag!: ParserMethod<unknown[], CstNode>;

    constructor() {
        super(tokens)

        const $ = this;

        // Main function rule
        $.RULE("function", () => {
            $.CONSUME(FunctionName);
            $.CONSUME(LCurly);
            $.SUBRULE($.functionBody);
            $.CONSUME(RCurly);
        });

        // Function body rule
        $.RULE("functionBody", () => {
            //TODO: Here can be some Javascript hooks to parse inside the visitor
            $.CONSUME(LParen);
            $.SUBRULE($.content);
            $.CONSUME(RParen);
        });

        // Content can be either tags or text
        $.RULE("content", () => {
            // Here is our vreact tag structure
            $.MANY(() => {
                $.OR([
                    { ALT: () => $.SUBRULE($.tag) },
                    { ALT: () => $.CONSUME(VSXText) }
                ]);
            });
        });

        // Tag structure
        $.RULE("tag", () => {
            $.CONSUME(VSXTagOpen);
            $.OPTION(() => {
                $.SUBRULE($.content);
            });
            $.CONSUME(VSXTagClose);
        });


        $.performSelfAnalysis()
    }
}

export default VSXCSTParser;
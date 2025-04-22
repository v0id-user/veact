import { CstParser } from "chevrotain";
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
    public function: any;
    public functionBody: any;
    public content: any;
    public tag: any;

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
            $.CONSUME(LParen);
            $.SUBRULE($.content);
            $.CONSUME(RParen);
        });

        // Content can be either tags or text
        $.RULE("content", () => {
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


        this.performSelfAnalysis()
    }
}

export default VSXCSTParser;
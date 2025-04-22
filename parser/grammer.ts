import { CstParser  } from "chevrotain";
import { tokens, FunctionName, LCurly, RCurly, LParen, RParen, VEXTagOpen, VEXTagClose, VEXText } from "./tokens";

class VEXParser extends CstParser  {

    // Declare all your rules as properties so typescript knows about them
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
                    { ALT: () => $.CONSUME(VEXText) }
                ]);
            });
        });

        // Tag structure
        $.RULE("tag", () => {
            $.CONSUME(VEXTagOpen);
            $.OPTION(() => {
                $.SUBRULE($.content);
            });
            $.CONSUME(VEXTagClose);
        });

    
        this.performSelfAnalysis()
    }
}

export default VEXParser;
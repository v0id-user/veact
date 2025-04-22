// [function_name] -> open_body -> { -> block_content -> close_body -> }

import { createToken, Lexer } from "chevrotain";


// https://chevrotain.io/docs/tutorial/step1_lexing.html#skipping-tokens
const whitespace = createToken({ name: 'whitespace', pattern: /\s+/, group: Lexer.SKIPPED });

// General tokens
export const FunctionName = createToken({ name: "FunctionName", pattern: /[a-zA-Z0-9_]+(?=\s*\{)/ })
export const LCurly = createToken({ name: 'LCurly', pattern: /\{/ });
export const RCurly = createToken({ name: 'RCurly', pattern: /\}/ });
export const LParen = createToken({ name: 'LParen', pattern: /\(/ });
export const RParen = createToken({ name: 'RParen', pattern: /\)/ });

// Vreact tokens
export const VEXTagOpen = createToken({ name: 'VEXTagOpen', pattern: /\[[a-zA-Z0-9_]+\]/ });
export const VEXText = createToken({
    name: 'VEXText',
    pattern: /[^()[\]{}]+/
});
export const VEXTagClose = createToken({ name: 'VEXTagClose', pattern: /\[\/[a-zA-Z0-9_]+\]/ });

// The ordering matters here
export const tokens = [
    // First skip all whitespaces
    whitespace,
    // Then parse the function name
    FunctionName,
    // Then parse opening curly braces
    LCurly,
        // Then parse opening parentheses
        LParen,
            // Then parse vex tag open
            VEXTagOpen,
            // Then parse closing vex tag
            VEXTagClose,
            // Then parse vex tag content so it does not eat the closing tag
            VEXText,
        // Then parse closing parentheses
        RParen,
    // Then parse closing curly braces
    RCurly
]

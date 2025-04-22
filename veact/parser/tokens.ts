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
export const VSXTagOpen = createToken({ name: 'VSXTagOpen', pattern: /\[[a-zA-Z0-9_]+\]/ });
export const VSXText = createToken({
    name: 'VSXText',
    pattern: /[^()[\]{}]+/
});
export const VSXTagClose = createToken({ name: 'VSXTagClose', pattern: /\[\/[a-zA-Z0-9_]+\]/ });

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
            // Then parse VSX tag open
            VSXTagOpen,
            // Then parse closing VSX tag
            VSXTagClose,
            // Then parse VSX tag content so it does not eat the closing tag
            VSXText,
        // Then parse closing parentheses
        RParen,
    // Then parse closing curly braces
    RCurly
]

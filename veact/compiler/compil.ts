import VSXASTParser from "@/veact/parser/ast";
function compile(vex: string) {
    const parser = new VSXASTParser();
    const ast = parser.parse(vex)
}

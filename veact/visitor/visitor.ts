import VSXCSTParser from "@/veact/parser/cst";

const $ = new VSXCSTParser()
const BaseVisitor = $.getBaseCstVisitorConstructor()

type FunctionContext = any;
class VSXVisitor extends BaseVisitor {
    constructor() {
        super()
        this.validateVisitor();
    }

    visitFunction(ctx: FunctionContext) {
        console.log(ctx)
    }
}

export default VSXVisitor;

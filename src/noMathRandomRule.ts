import * as Lint from "tslint";
import { isCallExpression, isIdentifier, isPropertyAccessExpression } from "tsutils";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Math.random() is forbidden";

    public static metadata: Lint.IRuleMetadata = {
        ruleName: "no-math-random",
        description: "Bans the use of `Math.random()` in code.",
        hasFix: false,
        rationale: "JavaScripts's built in `Math.random()` function is not "
                 + "seedable, secure, and not really that random.",
        options: null,
        optionsDescription: "Not configurable.",
        type: "functionality",
        typescriptOnly: false,
    };

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments);
    }
}

function walk(ctx: Lint.WalkContext<string[]>): void {
    return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
        if (isCallExpression(node) &&
            isPropertyAccessExpression(node.expression) &&
            isIdentifier(node.expression.expression) &&
            node.expression.expression.text === "Math" &&
            node.expression.name.text === "random") {
            // (ctx.options.length === 0 || ctx.options.indexOf(node.expression.name.text) !== -1)) {

            ctx.addFailureAtNode(node.expression, "Calls to 'Math.random' are not allowed.");
        }
        return ts.forEachChild(node, cb);
    });
}

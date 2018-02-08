# TSLint no-math-random Rule

[TSLint][tslint] rule to disallow `Math.random()` usage.

JavaScripts's built in `Math.random()` function is not seedable, not secure,
and not really that random. So, how about we disable it completely in projects
where using it could cause something bad.

## Usage

Add this to your package's `devDependencies`, then in your tsconfig.json:

```json
{
    "rules": {
        "no-math-random": true
    }
}
```

That's it! With this rule enabled any calls to `Math.random()` will result in a
linter error.

## The `ban` alternative

TSLint's built in rule [ban][ban] can accomplish much of what this repo allows.

exmaple:

```json
{
    "rules": {
        "ban": [
            true,
            {
                "name": ["Math", "random"],
                "message": "Use a better PRNG."
            }
        ]
    }
}
```

The main upside to this is that you don't need this pacskage; Hurrah! The only
downside is that if you selectively disable the `ban` rule for a line/block of
code, you've disabled **all** banned syntax which could hypotehically allow
other errors.

Also, I think the rule name is clearer as `no-math-random` rather than `ban`;
but to each their own.

However, in reality using `ban` is probably easier. I won't be offended.

## Motivation

I made this rule for two simple reasons:

1. To make sure developers do not use JS's built in Math.random when better
   solutions exist.
2. Because I wanted to learn some under the hood stuff with how TS and TSLint
   work.

The only thing you probably care about is the first. But if you did not know,
JS's built in Math.random() leaves lot to be desired (seeding), and is an easy
trap to fall into if you want to get into crytography.

If in your project you use some superior source of randomness via some PRNG
package, then you can ban the usage of JS's built-in PRNG using this rule!

But mostly this exists for the second reason :P

[tslint]: https://github.com/palantir/tslint
[ban]: https://palantir.github.io/tslint/rules/ban/

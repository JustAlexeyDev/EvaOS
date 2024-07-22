module.exports = function(babel) {
  const { types: t } = babel;

  return {
    visitor: {
      FunctionDeclaration(path) {
        if (t.isIdentifier(path.node.id, { name: 'Main' }) && t.isIdentifier(path.node.body.body[0].expression.callee, { name: 'send' })) {
          const newFunction = t.arrowFunctionExpression(
            [],
            t.blockStatement([
              t.expressionStatement(
                t.callExpression(
                  t.identifier('console.log'),
                  [t.stringLiteral("Hello")]
                )
              )
            ])
          );

          path.replaceWith(
            t.variableDeclaration('const', [
              t.variableDeclarator(
                t.identifier('Main'),
                newFunction
              )
            ])
          );
        }
      }
    }
  };
};
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Запрещает console.log без метки 'debug'.",
      category: "Possible Problems",
      recommended: false,
    },
    schema: [],
    messages: {
      forbiddenConsoleLog: "Используйте console.log только с меткой 'debug' (без учета регистра) в одном из аргументов.",
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'console' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'log'
        ) {
          const hasDebugArg = node.arguments.some(arg => {
            if (arg.type === 'Literal' && typeof arg.value === 'string') {
              return arg.value.toLowerCase().includes('debug');
            }
            if (arg.type === 'TemplateLiteral') {
              return arg.quasis.some(quasi => quasi.value.raw.toLowerCase().includes('debug'));
            }
            return false;
          });

          if (!hasDebugArg) {
            context.report({
              node: node,
              messageId: "forbiddenConsoleLog",
            });
          }
        }
      },
    };
  },
};

module.exports = {
  meta: {
    type: "suggestion", // или "problem", в зависимости от серьезности
    docs: {
      description: "Запрещает комментарии, не содержащие разрешенных ключевых слов.",
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // Правило не принимает опций
    messages: {
      forbiddenComment: "Удалите этот комментарий. Разрешены только комментарии, содержащие 'исключение', 'TODO', 'FIXME', 'NOTE', 'DEBUG', 'HACK', 'eslint', 'ts-ignore', 'ts-nocheck' или JSDoc.",
    },
  },
  create(context) {
    const allowedWords = [
      'исключение', 'todo', 'fixme', 'note', 'debug', 'hack',
      'eslint', 'ts-ignore', 'ts-nocheck','no-empty-function'
    ];

    function checkComment(node) {
      // Игнорируем JSDoc комментарии (/** ... */)
      if (node.type === 'Block' && node.value.startsWith('*')) {
        return;
      }

      const commentText = node.value.toLowerCase();
      const isAllowed = allowedWords.some(word => commentText.includes(word));

      if (!isAllowed) {
        context.report({
          node: node,
          messageId: "forbiddenComment",
        });
      }
    }

    return {
      Program(node) {
        // Проходим по всем комментариям в файле
        node.comments.forEach(comment => {
          checkComment(comment);
        });
      }
    };
  },
};

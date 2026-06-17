const hljs = require('highlight.js');

const escapeHtml = value =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sanitizeClassName = value => value.replace(/[^A-Za-z0-9_-]/g, '');

const visitCodeNodes = node => {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (node.type === 'code') {
    const language = node.lang ? sanitizeClassName(node.lang) : '';
    const code = node.value || '';
    const highlighted =
      language && hljs.getLanguage(language)
        ? hljs.highlight(code, { language, ignoreIllegals: true }).value
        : escapeHtml(code);
    const languageClass = language ? ` language-${language}` : '';

    node.type = 'html';
    node.value = `<pre class="code-block${languageClass}"><code class="hljs${languageClass}">${highlighted}</code></pre>`;
    delete node.children;

    return;
  }

  if (Array.isArray(node.children)) {
    node.children.forEach(visitCodeNodes);
  }
};

module.exports = ({ markdownAST }) => {
  visitCodeNodes(markdownAST);
  return markdownAST;
};

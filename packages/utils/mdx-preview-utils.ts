/**
 *
 * 拼接完整的Html
 *
 * @param head
 * @param body
 * @returns html string
 */

export const assembleHtml = (head: string, body: string) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      ${head}
  </head>
  <body>
      ${body}
  </body>
  </html>`;
};

interface IHtmlSource {
  mdxStr: string;
  cssStr?: string;
  scripts?: string[];
  cssLinks?: string[];
}

const PREVIEW_CONTAINER = '<div id="PREVIEW_CONTAINER"></div>';
const PREVIEW_IMPORT_MAP = `<script async src="https://ga.jspm.io/npm:es-module-shims@1.5.5/dist/es-module-shims.js"></script>
  <script type="importmap">
  {
    "imports": {
      "react": "https://cdn.skypack.dev/react",
      "react-dom": "https://cdn.skypack.dev/react-dom",
      "components": "./blog-components.js"
    }
  }
  </script>`;
const PREVIEW_MDX_WRAPPER = `<script type="module">
    import ReactDom from 'react-dom';
    import components from 'components';    
    MDX_STRING
    ReactDom.render(
      React.createElement(MDXContent,{ components }),
      document.querySelector('#PREVIEW_CONTAINER')
    );
  </script>`;

export const createHtml = (htmlSources: IHtmlSource) => {
  const { mdxStr, scripts, cssLinks, cssStr } = htmlSources;
  const getCssTag = () => {
    if (!cssLinks?.length) return '';
    return cssLinks
      .map((l) => `<link rel="stylesheet" type="text/css" href="${l}" />`)
      .join('\n');
  };
  const getScriptTag = () => {
    if (!scripts?.length) return '';
    return scripts.map((l) => `<script src="${l}" />`).join('\n');
  };
  const getStyleTag = () => {
    if (!cssStr) return '';
    return `<style>${cssStr}</style>`;
  };
  const head = `<head>\n${getCssTag()}${getScriptTag()}\n${getStyleTag()}\n</head>`;
  const MDX_SCRIPT = PREVIEW_MDX_WRAPPER.replace('MDX_STRING', mdxStr);
  const body = `<body>\n${PREVIEW_CONTAINER}\n${PREVIEW_IMPORT_MAP}\n${MDX_SCRIPT}\n</body>`;
  const finalHtml = assembleHtml(head, body);
  return finalHtml;
};

import { ServerStyleSheets as ServerStyleSheetsMUI } from "@material-ui/core";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { Children } from "react";
import { ServerStyleSheet as ServerStyleSheetsSC } from "styled-components";

/**
 * This `_document.js` includes some code for fixing the "className did not
 * match" bug that happens with Next.js SSR with styled-components and MUI.
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheetMUI = new ServerStyleSheetsMUI();
    const sheetSC = new ServerStyleSheetsSC();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheetSC.collectStyles(sheetMUI.collect(<App {...props} />)),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styled: [
          ...Children.toArray(initialProps.styles),
          sheetMUI.getStyleElement(),
        ],
        styles: (
          <>
            {initialProps.styles}
            {sheetSC.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheetSC.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

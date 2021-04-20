import Head from "next/head";
import PropTypes from "prop-types";
import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { assetPrefix } from "../src/util/utils";
import "./app.global.css";
import theme from '../src/util/styles';


const Footer = styled.footer`
  display: none;
`;

export default function App({ Component, pageProps }) {
  // Below is for MUI integration with Next.js SSR
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      {/* prettier-ignore */}
      <Head>
        <title>PreProSQL</title>
        <link rel="icon"       href={`${assetPrefix}/favicon.ico`} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=B612:wght@700&display=swap" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300&display=swap" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      <Footer>PreProSQL</Footer>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

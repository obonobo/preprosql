import { CircularProgress } from "@material-ui/core";
import Head from "next/head";
import { FloatyTiltyHeaderCard } from "../src/components/FloatyTiltyHeaderCard";
import styles from "./index.module.scss";

const Content = () => <FloatyTiltyHeaderCard />;

const Spinner = () => (
  <div className={styles.loadingContainer}>
    <CircularProgress
      color="secondary"
      style={{ height: "3em", width: "3em" }}
    />
  </div>
);

const Home = () => (
  <>
    <Head>
      <title>PreProSQL</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=B612:wght@700&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div className={styles.root}>
      <main>
        <Content />
      </main>
    </div>
    <footer style={{ display: "none" }}>PreProSQL</footer>
  </>
);

export default Home;

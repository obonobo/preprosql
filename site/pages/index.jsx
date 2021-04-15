import Head from "next/head";
import { FloatyTiltyHeaderCard } from "../src/components/FloatyTiltyHeaderCard";
import Triangles from "../src/components/Triangles";
import { assetPrefix } from "../src/utils";
import styles from "./index.module.scss";

const HeadWithFonts = () => (
  <Head>
    <title>PreProSQL</title>
    <link rel="icon" href={`${assetPrefix}/favicon.ico`} />
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
);

const MyFooter = () => <footer style={{ display: "none" }}>PreProSQL</footer>;

const Background = () => (
  <div className={styles.background}>
    <Triangles button className={styles.triangles} />
  </div>
);

const Home = () => (
  <>
    <HeadWithFonts />
    <main>
      <div className={styles.root}>
        <Background />
        <FloatyTiltyHeaderCard className={styles.floater} />
        <p>asdasd</p>
      </div>
      <MyFooter />
    </main>
  </>
);

export default Home;

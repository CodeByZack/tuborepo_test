import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
// import your default seo configuration
import SEO from '../next-seo.config';
import '@unocss/reset/tailwind.css'
import "../styles/heti.css";
import "../styles/code.css";
import "../../../uno.css";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
};

export default App;

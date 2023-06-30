import App, { AppContext } from 'next/app'
import type { AppProps } from "next/app";

import "./GlobalStyle.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(301, { Location: '/' })
    appContext.ctx.res.end()
    return
  }

  return { ...appProps }
}

export default MyApp
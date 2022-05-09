import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/assets/css/my.css" />
        <link rel="stylesheet" href="/assets/css/app.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <script src="/assets/js/feather-icons/feather.min.js"></script> */}

        <script src="/assets/js/app.js"></script>

        {/* <script src="/assets/js/main.js"></script> */}
      </body>
    </Html>
  );
}

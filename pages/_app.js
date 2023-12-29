import "@/styles/globals.css";
import "@/styles/calendar.css";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>Aero Club Admin</title>
        <meta
          name="description"
          content="El Aero Club Rafaela nació un 1 de Marzo de 1925, iniciando sus actividades sobre la Ruta Nacional 34 en jurisdiccióndel INTA, pasando, a partir de 1951, a ocupar las actuales instalaciones, las que fueron reiteradamente sometidas a reformas y ampliaciones para llevarlas a su actual estado de comodidad y confort, llegando a colocarse entre las más importantes del país sea por la importancia de sus instalaciones como por los altos servicios que presta gracias una permanente dedicación y esfuerzo de sus dirigentes y asociados."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <>
      <Head>
        <title>404 Error | Aero Club Administrador</title>
        <meta
          name="description"
          content="Error 404 Not Found."
        />
      </Head>
      <Header />
      <div className="flex justify-center items-center h-screen w-full">
        <div>
          <h2 className="font-normal text-2xl md:text-3xl mb-2">
            Error <b className="text-red-500">404</b>
          </h2>
          <h4
            className="font-normal text-xl md:text-2xl mb-6"
            style={{
              background: "linear-gradient(to right, #4EACF2, #004691)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Páguina no encontrada
          </h4>
          <div className="flex justify-center">
            <Link
              href={"/"}
              className="font-light text-lg hover:text-moreblue transition-all"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;

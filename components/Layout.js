import Nav from "./Nav";
import ResponsiveNav from "./ResponsiveNav";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

function Layout({ children }) {
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const watchToken = () => {
      if (!token) {
        router.push("/iniciar");
      } else {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
            router.push("/iniciar");
          }
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          localStorage.removeItem("token");
          router.push("/iniciar");
        }
      }
    };
    watchToken();
  }, []);

  const toggleResponsiveNav = () => {
    setShowResponsiveNav(!showResponsiveNav);
  };

  return (
    <div className="bg-primary min-h-screen w-full">
      <div className="">
        {showResponsiveNav ? (
          <div className="flex flex-col">
            <div className="flex justify-end px-5 py-4">
              <svg
                onClick={toggleResponsiveNav}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <ResponsiveNav />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="block md:hidden p-4">
              <div className="flex justify-between items-center">
                <Link href={"/"} className="flex items-center ml-1">
                  <img
                    src="https://aeroclub-website.s3.amazonaws.com/1693577423224.png"
                    alt="Logo"
                    className="rounded-md w-10"
                  />
                </Link>
                <div>
                  <h1 className="text-2xl font-light text-white">
                    Administrador
                  </h1>
                </div>
                <div onClick={toggleResponsiveNav}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="responsiveNav">
                <Nav />
              </div>
              <div className="flex-grow px-4">{children}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Layout;

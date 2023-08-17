import { useSession, signIn } from "next-auth/react";
import Nav from "./Nav";
import ResponsiveNav from "./ResponsiveNav";
import Link from "next/link";
import { useState } from "react";

function Layout({ children }) {
  const { data: session } = useSession();
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);

  const toggleResponsiveNav = () => {
    setShowResponsiveNav(!showResponsiveNav);
  };

  if (!session) {
    return (
      <div className="bg-blue-300 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-md"
          >
            Logeate con Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-300 min-h-screen">
      <div className="flex">
        {showResponsiveNav ? (
          <div className="flex flex-col">
            <div className="flex justify-end px-5 py-4">
              <svg
                onClick={toggleResponsiveNav}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
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
                    src="https://aeroclub-website.s3.amazonaws.com/1691463050161.jpg"
                    alt="Logo"
                    className="rounded-md w-10"
                  />
                </Link>
                <div>
                  <h1 className="text-2xl font-light">Administrador</h1>
                </div>
                <div onClick={toggleResponsiveNav}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
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

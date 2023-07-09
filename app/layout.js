
import "@styles/globals.css";
import "./data.js";
import ReactQueryProvider from "@components/ReactQueryProvider.jsx";
import NavBar from "@components/Navbar/Navbar.jsx";
import Providers from "@components/Providers.jsx";
import CheckAuth from "@components/CheckAuth/CheckAuth.jsx";
import CartLoad from "@components/CartLoad/CartLoad.jsx";
function RootLayout({ children }) {
  return (
    <Providers>
      <CartLoad />
      <html>
        <body style={{ backgroundColor: "whitesmoke" }}>
          <NavBar />
          <main className="mx-14">
            <CheckAuth />
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </main>
        </body>
      </html>
    </Providers>
  );
}

export default RootLayout;

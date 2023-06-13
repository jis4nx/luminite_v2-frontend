import "@styles/globals.css";
import "./data.js";
import ReactQueryProvider from "@components/ReactQueryProvider.jsx";
import NavBar from "@components/Navbar/Navbar.jsx";
function RootLayout({ children }) {
  return (
    <html>
      <body style={{backgroundColor: "whitesmoke"}}>
        <NavBar />
        <main className="mx-14">
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;

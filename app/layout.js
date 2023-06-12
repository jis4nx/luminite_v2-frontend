import "@styles/globals.css";
import "./data.js";
import ReactQueryProvider from "@components/ReactQueryProvider.jsx";
function RootLayout({ children }) {
  return (
    <html>
      <body>
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

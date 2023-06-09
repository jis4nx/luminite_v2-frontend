import "@styles/globals.css";
function RootLayout({ children }) {
  return (
    <html>
      <body>
        <main className="mx-14">
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;

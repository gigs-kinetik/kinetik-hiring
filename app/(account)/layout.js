import "../globals.css";

export default function LoginLayout({ children }) {
  return (
    <html className="h-full w-full bg-off-white">
      <body className="hero w-full h-full">
        <main className="overlay">{children}</main>
      </body>
    </html>
  );
}

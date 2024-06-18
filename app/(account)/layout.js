import "../globals.css";

export default function LoginLayout({ children }) {
  return (
    <html className="h-full w-full bg-off-white">
      <body className="flex flex-col w-full h-full">
        <main className="hero h-full">
          <div className="overlay w-full flex-grow">
            <div className="flex-grow">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}

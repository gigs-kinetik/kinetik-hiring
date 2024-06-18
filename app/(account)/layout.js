import "../globals.css";

export default function LoginLayout({ children }) {
  return (
    <html className="h-full w-full bg-off-white">
      <body className="hero w-full h-full">
        <main className="overlay">
          <div className="font-poppins flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-bl from-logo-purple/95 via-mid-purple/40 via-70% to-transparent">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

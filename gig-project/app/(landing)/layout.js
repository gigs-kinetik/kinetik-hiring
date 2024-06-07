import "../globals.css";

export default function LandingLayout({ children }) {
  return (
    <html className="h-full w-full bg-off-white">
      <body className="flex flex-col min-h-full">
        <body>{children}</body>
      </body>
    </html>
  );
}

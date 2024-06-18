import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html className="h-full w-full">
      <head>
        <link rel="icon" href="/logo.png" />
        <body className="h-full w-full">{children}</body>
      </head>
    </html>
  );
}

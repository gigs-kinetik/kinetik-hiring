import "../globals.css";

export default function LoginLayout({ children }) {
  return (
    <div className="h-full w-full bg-off-white">
      <div className="hero w-full h-full">
        <main className="overlay">{children}</main>
      </div>
    </div>
  );
}

import "../globals.css";

export default function LandingLayout({ children }) {
  return (
    <div className="h-full w-full bg-off-white">
      <div className="flex flex-col w-full h-full">
        <main className="hero h-full">
          <div className="overlay w-full flex-grow">
            <div className="flex-grow">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

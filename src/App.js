import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="bg-background w-full min-h-screen flex flex-col font-primary">
      <Navbar />
      <div className="relative h-screen">
        <div className="flex flex-col absolute top-8 left-8">
          <p className="font-heading font-semibold text-5xl">
            Carbon Footprint
          </p>
          <p className=" text-xs pl-2">Calculate Your's now!</p>
        </div>

        <img alt="" src="/hero.jpg" className="w-full h-screen object-fill " />
      </div>
      <Footer />
    </main>
  );
}

export default App;

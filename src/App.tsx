import LiveBuild from "./components/LiveBuild";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Works from "./components/Works";
import Contact from "./components/Contact";
import RobotAssistant from "./components/RobotAssistant";
import { useScrollReveal } from "./hooks/useScrollReveal";

function App() {
  useScrollReveal();

  return (
    <>
      <div className="grain" />
      <Preloader />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Works />
      <Contact />
      <RobotAssistant />
      <LiveBuild />
    </>
  );
}

export default App;

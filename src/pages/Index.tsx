
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Hours from "@/components/Hours";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import OrderButton from "@/components/OrderButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-smash text-white">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Hours />
      <Contact />
      <Footer />
      <OrderButton />
    </div>
  );
};

export default Index;

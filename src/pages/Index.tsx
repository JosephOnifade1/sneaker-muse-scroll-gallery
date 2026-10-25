import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Anatomy from "@/components/Anatomy";
import Vault from "@/components/Vault";
import Heritage from "@/components/Heritage";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <Hero />
      <Marquee />
      <Anatomy />
      <Vault />
      <Heritage />
      <Newsletter />
    </main>
    <Footer />
  </div>
);
export default Index;

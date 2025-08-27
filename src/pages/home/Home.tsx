import CallToAction from "@/components/pages/home/CallToAction";
import FeaturesSection from "@/components/pages/home/FeaturesSection";
import HeroSection from "@/components/pages/home/HeroSection";
import HowItWorksSection from "@/components/pages/home/HowItWorksSection";
import TestimonialSection from "@/components/pages/home/TestimonialSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialSection />
      <CallToAction />
    </div>
  );
};

export default Home;

import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";
import { NumberSystemsSection } from "@/components/NumberSystemsSection";
import { BinaryArithmeticSection } from "@/components/BinaryArithmeticSection";
import { CodesAndOrganizationSection } from "@/components/CodesAndOrganizationSection";
import { HardwareSection } from "@/components/HardwareSection";
import { IODevicesSection } from "@/components/IODevicesSection";
import { StorageSection } from "@/components/StorageSection";
import { SoftwareSection } from "@/components/SoftwareSection";
import { NetworksAndMaintenanceSection } from "@/components/NetworksAndMaintenanceSection";
import { InteractiveVisualization } from "@/components/InteractiveVisualization";
import { TrackingDemo } from "@/components/TrackingDemo";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <IntroductionSection />
        <NumberSystemsSection />
        <BinaryArithmeticSection />
        <CodesAndOrganizationSection />
        <HardwareSection />
        <IODevicesSection />
        <StorageSection />
        <SoftwareSection />
        <NetworksAndMaintenanceSection />
        <InteractiveVisualization />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-950/20 backdrop-blur-xl">
            <TrackingDemo />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

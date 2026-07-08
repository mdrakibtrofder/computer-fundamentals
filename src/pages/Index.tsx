import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { IntroductionSection } from "@/components/IntroductionSection";
import { NumberSystemsSection } from "@/components/NumberSystemsSection";
import { BinaryArithmeticSection } from "@/components/BinaryArithmeticSection";
import { CodesAndOrganizationSection } from "@/components/CodesAndOrganizationSection";
import { HardwareSection } from "@/components/HardwareSection";
import { IODevicesSection } from "@/components/IODevicesSection";
import { MicroprocessorSection } from "@/components/MicroprocessorSection";
import { MemorySection } from "@/components/MemorySection";
import { SoftwareSection } from "@/components/SoftwareSection";
import { NetworksAndMaintenanceSection } from "@/components/NetworksAndMaintenanceSection";
import { InformationTechnologySection } from "@/components/InformationTechnologySection";
import { ComputersAndSocietySection } from "@/components/ComputersAndSocietySection";
import { InteractiveVisualization } from "@/components/InteractiveVisualization";
import { TrackingDemo } from "@/components/TrackingDemo";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background lg:pl-72">
      <Navigation />
      <main className="pt-20 lg:pt-0">
        <HeroSection />
        <IntroductionSection />
        <NumberSystemsSection />
        <CodesAndOrganizationSection />
        <BinaryArithmeticSection />
        <HardwareSection />
        <IODevicesSection />
        <MicroprocessorSection />
        <MemorySection />
        <SoftwareSection />
        <NetworksAndMaintenanceSection />
        <InformationTechnologySection />
        <ComputersAndSocietySection />
        <InteractiveVisualization />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-950/20 backdrop-blur-xl">
            <TrackingDemo />
        </div>
      </main>
      <div className="lg:pl-0">
        <Footer />
      </div>
    </div>
  );
};

export default Index;

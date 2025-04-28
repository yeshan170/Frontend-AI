import { NavBar } from '@/components/organisms/NavBar';
import { HeroSection } from './heroSection';
import { FeatureSection } from './featureSection';
import { CTA } from './ctaSection';
import { Footer } from '@/components/organisms/Footer';

export const Home = () => {
    return (
        <div className="w-full h-screen">
            <NavBar />
            <HeroSection />
            <FeatureSection />
            <CTA />       
            <Footer />
        </div>
    );
};

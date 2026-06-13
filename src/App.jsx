import { LazyMotion, domAnimation } from 'framer-motion'

// Layout
import ScrollProgress from '@/components/layout/ScrollProgress'
import Navbar from '@/components/layout/Navbar'

// Sections
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import OffersSection from '@/components/sections/OffersSection'
import RoomsSection from '@/components/sections/RoomsSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import MedinaSection from '@/components/sections/MedinaSection'
import FooterSection from '@/components/sections/FooterSection'

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MedinaSection />
        <OffersSection />
        <RoomsSection />
        <ReviewsSection />
        <FAQSection />
        <CTASection />
      </main>
      <FooterSection />
    </LazyMotion>
  )
}

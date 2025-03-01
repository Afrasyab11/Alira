import { AIAgent } from "@/components/pages/landingPage/components/AiAgent"
import { Navbar } from "@/common/Topbar/Topbar"
import { WhatAliraDo } from "@/components/pages/landingPage/components/WhatAliraDo"
import Price from "@/components/pages/landingPage/components/Price"
import Testimonials from "@/components/pages/landingPage/components/Testimonial"
import { Footer } from "@/common/Footer/Footer"
export default function Home() {

  
  return (
    <div className="">
    <Navbar />
    <main className="">
      <section id="ai-agent">
        <AIAgent />
      </section>
      <section id="core-section">
        <WhatAliraDo />
      </section>
      <section id="price-section">
        <Price />
      </section>
      <section id="testimonial-section">
        <Testimonials />
      </section>
      <section >
        <Footer />
      </section>
    </main>
  </div>
  )
}


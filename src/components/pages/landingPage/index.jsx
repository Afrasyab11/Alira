import { AIAgent } from "./components/AiAgent"
import { Navbar } from "../../../common/Topbar/Topbar"
import { WhatAliraDo } from "./components/WhatAliraDo"
import { Footer } from "../../../common/Footer/Footer"
import Testimonials from "./components/Testimonial"
import Price from "./components/Price"
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


import { AIAgent } from "@/components/pages/landingPage/components/AiAgent"
import { Navbar } from "@/common/Topbar/Topbar"
import { WhatAliraDo } from "@/components/pages/landingPage/components/WhatAliraDo"
import Price from "@/components/pages/landingPage/components/Price"
import Testimonials from "@/components/pages/landingPage/components/Testimonial"
export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className="">
       <AIAgent/>
       <WhatAliraDo/>
       <Price/>
       <Testimonials/>
      </main>
    </div>
  )
}


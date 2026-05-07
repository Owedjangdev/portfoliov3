

import About from '../sections/About'
import Hero from '../sections/Hero'
import  Works from "../sections/Realisations"
import Skills from '../sections/Skills'
import Testimonials from '../sections/Testimonials'
import FAQ from '../sections/FAQ'

const Page= () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0F]">
      
        <Hero />
        <About />
            <Works />
           <Skills />
           <Testimonials />

 <FAQ />
        
    </div>

  )
}

export default Page
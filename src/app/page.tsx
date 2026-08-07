import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Skills from "@/components/landing/skills";
import GithubContributions from "@/components/landing/github";
import Projects from "@/components/landing/projects";
import Certificates from "@/components/landing/certificates";
import Quote from "@/components/landing/quote";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <GithubContributions />
      <Certificates />
      <Quote />
      <CTA />
      <Footer />
    </main>
  );
}


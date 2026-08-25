import Hero from "@/components/home/Hero";
import ProblemSolution from "@/components/home/ProblemSolution";
import ServicesSection from "@/components/home/ServicesSection";
import ArticlesTeaser from "@/components/home/ArticlesTeaser";
import ContactForm from "@/components/ContactForm";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const latestArticles = getAllArticles().slice(0, 3);

  return (
    <>
      <Hero />
      <ProblemSolution />
      <ServicesSection />
      <ArticlesTeaser articles={latestArticles} />
      <ContactForm />
    </>
  );
}

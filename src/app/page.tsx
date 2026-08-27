import Hero from "@/components/home/Hero";
import WhoWeAre from "@/components/home/WhoWeAre";
import WhatWeDo from "@/components/home/WhatWeDo";
import ProblemSolution from "@/components/home/ProblemSolution";
import ArticlesTeaser from "@/components/home/ArticlesTeaser";
import ContactForm from "@/components/ContactForm";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const latestArticles = getAllArticles().slice(0, 3);

  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <ProblemSolution />
      <ArticlesTeaser articles={latestArticles} />
      <ContactForm />
    </>
  );
}

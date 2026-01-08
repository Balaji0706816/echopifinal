"use client"
import Header from "../components/header/Header";

import PricingCard from "../components/PricingCard";
import FAQ from "../components/FAQ";
import FourWays from "../components/FourWays";



export default function Home() {
  return (
    <main >
 <Header/>

 <FourWays />
 <PricingCard />
 <FAQ />
    </main>
  );
}

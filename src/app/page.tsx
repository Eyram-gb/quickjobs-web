import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyUs from "@/components/Home/WhyUs";
import Image from "next/image";
import React from "react";
// import MainLayout from "../components/layout/MainLayout";

export default function Home() {
  return (
    <>
      <div>
        <Hero />  
        <HowItWorks/>
        <WhyUs />  
        <Categories />  
      </div>
    </>
  );
}

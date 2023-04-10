import React from 'react';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Feature } from '@/components/Feature';
import Waitlist from '@/components/Waitlist';
import Head from "next/head";


function Home() {
  return (
    <div className="bg-[#1e1e1e] top-0 ">
      <Head>
        <title>Home | CrimeStop-Analytics</title>
        <meta name="description" content="A solution to the ongoing problem of crime and public safety" />
        <meta name="keywords" content="CrimeStop-Analytics, Crime Analysis, CrimeStop, Jamaica" />
        <meta name="author" content="Garret Tomlin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:image" content="https://res.cloudinary.com/dwhs4luwi/image/upload/v1681147022/icon_tsvzxl.png"/>
      </Head>
      <NavBar />
      <div className="relative flex flex-col md:flex-row bg-[#1e1e1e] top-0">
        <div className="md:w-1/2 order-2 md:order-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center items-start text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 absolute inset-0 flex items-center justify-center z-10 mb-[30rem] ml-12 lg:mr-[70rem]">
            We dont need to live in fear
          </h1>
          <p className="text-base md:text-lg mb-8 mt-20 md:mt-0">
            At CrimeStop Analytics, we are committed to finding new and innovative ways to address
            the ongoing challenge of crime and public safety. Our focus is on fostering community
            policing efforts that empower citizens and law enforcement agencies to work together
            to prevent crime and keep our communities safe. By leveraging the latest technologies,
            including facial recognition and geofencing, we aim to create a platform that enables
            real-time crime reporting and analytics, enhancing the effectiveness of law
            enforcement and improving public safety for all.
          </p>
          <button className="btn bg-[#e01e]">
            <span className="text-white">Get CrimeStop Analytics</span>
          </button>
        </div>
        <div className="md:w-1/2 order-1 md:order-2">
          <Image
            src="/images/geofencing.jpg"
            className="rounded-lg shadow-2xl"
            alt=""
            width={900}
            height={390}
          />
        </div>
      </div>

      <section className="flex justify-center items-center  h-87rem lg:h-[87rem]">
        <Feature />
      </section>
      <Waitlist />
      <Footer />
    </div>
  );
}

export default Home;

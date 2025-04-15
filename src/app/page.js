import { Icons } from "@/components/common/Icons";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import ContactForm from "@/components/sections/ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ArrowRight, Check, Star, AudioLines } from "lucide-react";

export default async function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-8 lg:grid lg:grid-cols-3 sm:pb-20 lg:gap-x-0 xl:gap-x-8   ">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* <div className="absolute w-28 left-0 -top-20 hidden lg:block"> */}
              {/* i forgot this div right here in the video, it's purely visual gradient and looks nice */}
              {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
                <img src="/assets/snake-1.png" className="w-full" alt="snake" />
              </div> */}
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-3xl md:text-5xl lg:text-7xl">
                Revolutionizing Real Estate{" "}
                <span className="bg-green-600 px-2 text-white">
                  Ad Creation
                </span>{" "}
                with AI
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                AdFrame revolutionizes real estate marketing by automating ad
                creation with{" "}
                <span className="font-semibold">AI-powered solutions</span>. It
                transforms property listings into highly engaging ads tailored
                for your target audience. Our platform ensures ads are optimized
                for{" "}
                <span className="font-semibold">
                  multi-platform integration
                </span>
                , including social media and search engines. With advanced
                analytics, you can track performance and refine strategies to
                achieve unparalleled results in
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    AI-Driven Ad Creation for Maximum Impact
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" /> Voice
                    Customizable Target Audience Selection
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Seamless Publishing Across Multiple Platforms
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Real-Time Analytics for Continuous Optimization
                  </li>
                </div>
              </ul>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex items-center justify-center px-8 sm:px-16 md:px-0 mt-10 lg:mx-0   h-fit">
            <div className="relative md:max-w-xl">
              <img
                src="/assets/line.png"
                className="absolute w-20 -left-6 -bottom-6 select-none"
                alt="line"
              />

              <iframe
                src="https://assets.pinterest.com/ext/embed.html?id=1028861477365994638"
                height="714"
                width="345"
                frameborder="0"
                scrolling="no"
                allowtransparency="true"
                muted
              ></iframe>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="w-full  my-20">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold px-0 text-center tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get answers to the most common questions about our products and
              services.
            </p>
          </div>
          <div className="mt-8 px-4 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is AdFrame?</AccordionTrigger>
                <AccordionContent>
                  AdFrame is an AI-powered platform designed to automate and
                  enhance real estate advertising. It helps create stunning,
                  targeted ads for property listings and optimizes them for
                  maximum visibility across multiple platforms.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How does AdFrame generate ads for real estate listings?
                </AccordionTrigger>
                <AccordionContent>
                  AdFrame uses advanced AI to analyze your property data,
                  including images, descriptions, and target audience
                  preferences. It then automatically generates engaging ads,
                  customized for your chosen platforms, such as social media,
                  search engines, or real estate websites.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I track the performance of my ads?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, AdFrame provides detailed analytics to monitor the
                  performance of your ads. You can track engagement, clicks, and
                  conversions to refine your advertising strategy for better
                  results.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Does AdFrame support multi-platform integration?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! AdFrame allows you to seamlessly publish your ads
                  across multiple platforms, including social media, search
                  engines, and real estate marketplaces, ensuring maximum reach
                  and visibility for your listings.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Do I need technical expertise to use AdFrame?
                </AccordionTrigger>
                <AccordionContent>
                  No, AdFrame is designed to be user-friendly and intuitive. You
                  don’t need technical expertise to create and manage ads. The
                  platform handles everything from ad creation to optimization,
                  allowing you to focus on closing deals.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      {/*   CONTACT US */}
      <section className="bg-white px-4 dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            Contact Us
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed my-8">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

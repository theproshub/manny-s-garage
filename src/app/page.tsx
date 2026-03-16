"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CarFront,
  ChevronDown,
  Cpu,
  Hammer,
  MapPin,
  PhoneCall,
  Tv,
} from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { SectionHeading } from "@/components/section-heading";
import { siteImages } from "@/lib/site-images";

const heroImages = [
  siteImages.garageHero,
  siteImages.diagnostics,
  siteImages.handymanTv,
  siteImages.diyGarage,
];

const galleryImages = [
  siteImages.garageHero,
  siteImages.diagnostics,
  siteImages.handymanTv,
  siteImages.handymanFurniture,
  siteImages.handymanCameras,
  siteImages.diyGarage,
];

const testimonials = [
  {
    text: "They found the electrical issue my dealer couldn't. Fast, honest, and the booking system is insanely easy.",
    author: "Mark R.",
    context: "2019 F-150",
  },
  {
    text: "Best shop in Fargo. The diagnostic scan results were sent right to my phone before they did any work.",
    author: "Sarah T.",
    context: "2021 Civic",
  },
  {
    text: "Had my TV mounted and a security camera installed in one visit. Professional and left everything spotless.",
    author: "James K.",
    context: "Handyman Services",
  },
];

const faqs = [
  {
    q: "Do I need an appointment for automotive service?",
    a: "Yes. Book online or call us to schedule. We offer same-day and next-day slots when available.",
  },
  {
    q: "What's included in the DIY garage rental?",
    a: "Full access to our bay with car lift, diagnostic scanner, oil change and tire tools, air compressor, power tools, workbench, and lighting. $20/hour, up to 8 hours per session.",
  },
  {
    q: "How does handyman pricing work?",
    a: "Furniture assembly is $50 per item. TV mounting is $1.75 per inch of screen size. Security camera installation is $120 per camera. Use our quote calculator on the Handyman page for an estimate.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative overflow-x-hidden">
      <div className="noise-overlay" />

      {/* ─── HERO ─── */}
      <section className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="min-w-0 max-w-2xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 flex flex-wrap items-center gap-3 sm:mb-7"
            >
              <span className="premium-badge badge-orange">Fargo, ND</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="metal-text block">Manny&apos;s Garage</span>
              <span className="mt-2 block text-white/90 sm:mt-3">
                Auto, Handyman, DIY & <span className="orange-glow-text">IT.</span> One place.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-400 sm:mt-7 sm:text-lg"
            >
              Auto repair, handyman installations, IT support, and a DIY bay—all under one roof in Fargo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Link href="/book?service=automotive" className="btn-primary group">
                Book Auto
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/handyman" className="btn-outline group">
                Handyman
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/diy-garage" className="btn-outline group">
                DIY Bay
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/it" className="btn-outline group">
                IT
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] shadow-xl shadow-black/30"
          >
            <div className="hero-glow" />
            <div className="relative aspect-[4/3] w-full bg-black">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[currentSlide]}
                    alt={`Service showcase ${currentSlide + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className="img-side-overlay z-10" />
              <div className="absolute top-6 right-6 z-20 flex gap-2">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "w-6 bg-orange-400" : "w-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICE CARDS ─── */}
      <section id="services" className="relative mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What We Offer"
          title={<>Choose Your <span className="orange-glow-text">Service</span></>}
          description="From full-service auto repair to handyman installations, IT & networking, and DIY bay rental—all under one roof."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatedCard
            title="Automotive Service"
            description="Professional repair and maintenance for cars and light trucks."
            imageSrc={siteImages.diagnostics}
            icon={<CarFront className="h-6 w-6" />}
            tag="AUTO"
            href="/auto"
            delay={0.1}
          />
          <AnimatedCard
            title="Handyman Services"
            description="Home installation services including TV mounting, security cameras, and furniture assembly."
            imageSrc={siteImages.handymanTv}
            icon={<Tv className="h-6 w-6" />}
            tag="HOME"
            href="/handyman"
            delay={0.2}
          />
          <AnimatedCard
            title="DIY Garage"
            description="Rent a fully equipped garage space and work on your own vehicle."
            imageSrc={siteImages.diyGarage}
            icon={<Hammer className="h-6 w-6" />}
            tag="RENTAL"
            href="/diy-garage"
            delay={0.3}
          />
          <AnimatedCard
            title="IT Consultant"
            description="Network setup, PC builds, data recovery, and smart home integration."
            imageSrc={siteImages.itConsultant}
            icon={<Cpu className="h-6 w-6" />}
            tag="IT"
            href="/it"
            delay={0.4}
          />
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Gallery"
          title="Our Facility & Work"
          align="center"
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {galleryImages.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black"
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="What Our Customers Say"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm"
            >
              <p className="text-zinc-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-4 flex items-center gap-2">
                <span className="font-semibold text-white">{t.author}</span>
                <span className="text-zinc-500">·</span>
                <span className="text-sm text-zinc-500">{t.context}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading badge="FAQ" title="Frequently Asked Questions" align="center" />
        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-orange-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-zinc-400">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative mx-auto max-w-7xl px-4 pb-32 pt-24 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact"
          title="Visit or Get in Touch"
          description="We're here to help. Call, email, or stop by our facility."
          align="center"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold text-white">Contact Info</h3>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                <span>123 Mechanic Ave, Fargo, ND 58103</span>
              </li>
              <li>
                <a href="tel:+17015550142" className="flex items-center gap-3 transition-colors hover:text-white">
                  <PhoneCall className="h-5 w-5 shrink-0 text-cyan-400" />
                  (701) 555-0142
                </a>
              </li>
              <li>
                <a href="mailto:service@mannysgarage.com" className="flex items-center gap-3 transition-colors hover:text-white">
                  service@mannysgarage.com
                </a>
              </li>
            </ul>
            <Link href="/book" className="btn-primary group mt-4 inline-flex">
              Book Service
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
          >
            <iframe
              title="Manny's Garage location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2182.360848876!2d-96.789387!3d46.8772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDUyJzM3LjkiTiA5NsKwNDcnMjEuOCJX!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { SignupModal, FbIcon, IgIcon, BlueBadge, ShieldIcon } from "./components";

// ---- Header ----
function Header({ openModal }: { openModal: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/image/logo-meta.svg" width={130} height={26} alt="Meta" priority />
          <span className="text-[#1C2B33] font-bold text-lg leading-none mt-0.5">Verified</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#benefits" className="text-sm font-medium text-gray-700 hover:text-[#0866FF] transition-colors">Benefits</a>
          <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-[#0866FF] transition-colors">FAQ</a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={openModal} className="text-sm font-semibold text-[#0866FF] hover:underline">Log in</button>
          <button onClick={openModal} className="bg-[#0866FF] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#0755d4] transition-colors">
            Claim free badge
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-1.5 flex flex-col gap-1.5" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="block w-5 h-0.5 bg-gray-700" />
          <span className="block w-5 h-0.5 bg-gray-700" />
          <span className="block w-5 h-0.5 bg-gray-700" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-3">
          <a href="#benefits" className="block text-sm font-medium text-gray-700">Benefits</a>
          <a href="#faq" className="block text-sm font-medium text-gray-700">FAQ</a>
          <button onClick={openModal} className="w-full bg-[#0866FF] text-white text-sm font-semibold py-2.5 rounded-full mt-2">Claim free badge</button>
        </div>
      )}
    </header>
  );
}

// ---- Hero ----
function Hero({ openModal }: { openModal: () => void }) {
  return (
    <section className="bg-white py-20 md:py-28 px-5">
      <div className="max-w-4xl mx-auto text-center">
        {/* Platform badges */}
        <div className="flex justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <FbIcon size={22} />
            <BlueBadge size={20} />
          </div>
          <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
            <IgIcon size={22} />
            <BlueBadge size={20} />
          </div>
        </div>

        {/* Invite badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#16a34a" fillOpacity="0.15" stroke="#16a34a" strokeWidth="1.3"/>
            <path d="M5 8.5l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          You're on the invite list — completely free
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
          Get verified for free<br />
          <span className="text-[#0866FF]">you&apos;ve been invited</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          You have been selected by Meta to receive a free blue verification badge on Facebook and Instagram.
          Confirm your identity now to activate your badge — no subscription required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={openModal} className="bg-[#0866FF] text-white font-semibold px-9 py-3.5 rounded-full text-base hover:bg-[#0755d4] transition-colors shadow-sm">
            Claim your free badge
          </button>
          <button onClick={openModal} className="border border-gray-300 text-gray-800 font-semibold px-9 py-3.5 rounded-full text-base hover:bg-gray-50 transition-colors">
            Learn more
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          {[
            "Free for invited accounts",
            "Official identity verification",
            "Impersonation protection",
          ].map((label, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
              <BlueBadge size={16} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Benefits ----
function Benefits() {
  const items = [
    {
      img: "/image/verified-badge.jpg",
      icon: <BlueBadge size={28} />,
      title: "Blue verification badge",
      desc: "Receive the official blue badge on Facebook and Instagram so followers instantly recognize your authentic account.",
    },
    {
      img: "/image/enhanced-support.jpg",
      icon: <Image src="/image/ic_in.svg" width={28} height={28} alt="support" />,
      title: "Dedicated account support",
      desc: "Access a specialized support team to resolve account issues quickly — no more waiting in generic queues.",
    },
    {
      img: "/image/impersonation.jpg",
      icon: <ShieldIcon size={28} />,
      title: "Impersonation monitoring",
      desc: "We actively monitor and take action against accounts that impersonate your identity across Meta platforms.",
    },
    {
      img: "/image/profile-features.jpg",
      icon: <Image src="/image/ic_apart.svg" width={28} height={16} alt="features" />,
      title: "Exclusive profile features",
      desc: "Stand out with increased visibility in search results, Reels recommendations, and platform-wide suggestions.",
    },
  ];

  return (
    <section id="benefits" className="bg-gray-50 py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Meta Verified?</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything you need to grow a trusted presence on Facebook and Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="relative w-full h-40 bg-gray-100">
                <Image src={item.img} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Pricing ----
function Pricing({ openModal }: { openModal: () => void }) {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");

  const plans = [
    {
      platform: "Facebook",
      icon: <FbIcon size={32} />,
      bg: "bg-blue-50",
      monthly: 11.99,
      annual: 9.59,
      features: [
        "Blue badge on Facebook",
        "Dedicated account support",
        "Impersonation monitoring",
        "Search & feed visibility boost",
        "1,000 free Stars per month",
      ],
      popular: false,
    },
    {
      platform: "Instagram",
      icon: <IgIcon size={32} />,
      bg: "bg-pink-50",
      monthly: 11.99,
      annual: 9.59,
      features: [
        "Blue badge on Instagram",
        "Dedicated account support",
        "Impersonation monitoring",
        "Reels & search boost",
        "100 free Stars per month",
      ],
      popular: true,
    },
    {
      platform: "Facebook & Instagram",
      icon: (
        <div className="flex gap-1.5 items-center">
          <FbIcon size={28} />
          <IgIcon size={28} />
        </div>
      ),
      bg: "bg-blue-50",
      monthly: 21.99,
      annual: 17.59,
      features: [
        "Blue badge on both platforms",
        "Priority account support",
        "Full impersonation protection",
        "Boosted visibility everywhere",
        "1,000 Stars + 100 Stars / month",
        "Early access to new features",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="bg-white py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose your plan</h2>
          <p className="text-gray-500 text-lg mb-8">Flexible billing — pay monthly or save with an annual plan.</p>

          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${billing === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annually")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${billing === "annually" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              Annually <span className="ml-1 text-green-600 font-bold text-xs">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => {
            const price = billing === "monthly" ? plan.monthly : plan.annual;
            return (
              <div
                key={i}
                className={`relative rounded-2xl border-2 p-7 flex flex-col transition-shadow ${plan.popular ? "border-[#0866FF] shadow-xl" : "border-gray-200 shadow-sm hover:shadow-md"}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0866FF] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${plan.bg}`}>
                  {plan.icon}
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-1">{plan.platform}</h3>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">${price.toFixed(2)}</span>
                  <span className="text-gray-500 text-sm ml-1">/month</span>
                  {billing === "annually" && (
                    <p className="text-green-600 text-xs font-semibold mt-1">
                      Save ${((plan.monthly - plan.annual) * 12).toFixed(2)}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <BlueBadge size={17} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={openModal}
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-colors ${plan.popular ? "bg-[#0866FF] text-white hover:bg-[#0755d4]" : "border-2 border-gray-300 text-gray-800 hover:bg-gray-50"}`}
                >
                  Get {plan.platform}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---- Showcase ----
function Showcase() {
  return (
    <section className="bg-gray-50 py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Recognized everywhere,<br />instantly.
          </h2>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Your blue badge appears on your profile, posts, Reels, Stories, and wherever your name shows up — so followers, partners, and brands know they&apos;re engaging with the real you.
          </p>
          <ul className="space-y-4">
            {[
              "Profile & business pages",
              "Posts, Stories & Reels",
              "Search results & suggestions",
              "Comments & direct messages",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <BlueBadge size={20} />
                <span className="text-gray-800 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center">
          <div className="relative w-[220px] h-[430px] bg-white rounded-[2.5rem] shadow-2xl border-[4px] border-gray-800 overflow-hidden">
            {/* Notch */}
            <div className="bg-gray-900 h-7 flex items-center justify-center">
              <div className="w-16 h-3.5 bg-black rounded-full" />
            </div>

            {/* Profile area */}
            <div className="p-4 bg-gradient-to-b from-blue-50 to-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5">
                    <BlueBadge size={16} />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-900 text-xs">Meta Official</span>
                    <BlueBadge size={12} />
                  </div>
                  <span className="text-gray-400 text-[10px]">@metaofficial</span>
                </div>
              </div>

              {/* Skeleton bio */}
              <div className="space-y-1.5 mb-3">
                <div className="h-2 bg-gray-200 rounded-full w-full" />
                <div className="h-2 bg-gray-200 rounded-full w-4/5" />
                <div className="h-2 bg-gray-200 rounded-full w-2/3" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-1.5 text-center mb-3">
                {[["1.2K", "Posts"], ["456K", "Followers"], ["321", "Following"]].map(([n, l], i) => (
                  <div key={i} className="bg-white rounded-xl p-1.5 shadow-sm">
                    <div className="font-bold text-gray-900 text-xs">{n}</div>
                    <div className="text-gray-400 text-[9px]">{l}</div>
                  </div>
                ))}
              </div>

              {/* Post skeletons */}
              <div className="space-y-2">
                {[0, 1, 2].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-14" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- FAQ ----
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    {
      q: "What is Meta Verified?",
      a: "Meta Verified is a paid subscription service that lets you verify your identity with a government ID, receive a blue badge, and access dedicated account support and impersonation protection on Facebook and Instagram.",
    },
    {
      q: "Who can subscribe to Meta Verified?",
      a: "Individuals 18 years or older with an active Facebook or Instagram account who meet Meta's minimum activity requirements and have a valid government-issued ID are eligible to subscribe.",
    },
    {
      q: "Is the Meta Verified badge the same as the legacy verified badge?",
      a: "No. The Meta Verified badge confirms your identity was verified with a government ID. The legacy badge was granted to notable public figures and brands based on notability.",
    },
    {
      q: "Can I cancel at any time?",
      a: "Yes. You can cancel anytime. After cancellation, your blue badge and associated benefits will be removed at the end of your current billing period.",
    },
    {
      q: "Does the badge carry over between Facebook and Instagram?",
      a: "No. Each platform requires its own subscription unless you subscribe to the combined Facebook & Instagram plan, which covers both.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-20 md:py-28 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          <p className="text-gray-500">Everything you need to know about Meta Verified.</p>
        </div>

        <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-base pr-4">{item.q}</span>
                <Image
                  src={open === i ? "/image/ic_apart.svg" : "/image/ic_plus.svg"}
                  width={16}
                  height={16}
                  alt={open === i ? "Collapse" : "Expand"}
                  className="shrink-0"
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed bg-gray-50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- CTA Banner ----
function CTABanner({ openModal }: { openModal: () => void }) {
  return (
    <section className="bg-[#0866FF] py-20 px-5 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center gap-4 mb-7">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl"><FbIcon size={36} /></div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl"><IgIcon size={36} /></div>
        </div>
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="1.3"/>
            <path d="M5 8.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Invite-only — free of charge
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your free badge is waiting</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
          You&apos;ve been selected to receive Meta Verified at no cost. Claim your blue badge now before this invitation expires.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={openModal} className="bg-white text-[#0866FF] font-bold px-9 py-3.5 rounded-full text-base hover:bg-blue-50 transition-colors">
            Claim free badge
          </button>
          <button onClick={openModal} className="border-2 border-white/60 text-white font-semibold px-9 py-3.5 rounded-full text-base hover:bg-white/10 transition-colors">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="bg-[#1C2B33] text-gray-400 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/image/logo-meta.svg" width={90} height={18} alt="Meta" className="brightness-0 invert opacity-80" />
              <span className="text-white font-bold text-base">Verified</span>
            </div>
            <p className="text-xs leading-relaxed max-w-[180px]">
              Authenticate your identity and build a trusted presence across Meta platforms.
            </p>
          </div>

          {[
            { title: "Product", links: ["Meta Verified", "Facebook", "Instagram"] },
            { title: "Support", links: ["Help Center", "FAQ", "Contact us", "Account issues"] },
            { title: "Legal", links: ["Terms of service", "Privacy policy", "Cookie policy", "Subscription terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-3 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2026 Meta Platforms, Inc. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <FbIcon size={20} />
            <IgIcon size={20} />
            <Image src="/image/ic_x.svg" width={20} height={20} alt="X" className="opacity-60" />
            <Image src="/image/ic_whatsapp.svg" width={20} height={20} alt="WhatsApp" className="opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---- Page ----
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);
  return (
    <main>
      <Header openModal={open} />
      <Hero openModal={open} />
      <Benefits />
      <Showcase />
      <FAQ />
      <CTABanner openModal={open} />
      <Footer />
      {modalOpen && <SignupModal onClose={close} />}
    </main>
  );
}

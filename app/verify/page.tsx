"use client";

import { useState, useEffect } from "react";
import { SignupModal } from "../components";

function randomTicketId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seg = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `#Y${seg(3)}-${seg(4)}-${seg(3)}`;
}

export default function VerifyPage() {
  const [ticketId, setTicketId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setTicketId(randomTicketId());
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 pt-16 pb-10">
        <div className="w-full max-w-[700px]">
          {/* Header row */}
          <div className="flex items-center gap-4 mb-8">
            {/* Blue badge icon */}
            <div className="shrink-0 w-14 h-14 rounded-full bg-[#0866FF] flex items-center justify-center shadow-md">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="15" fill="#0866FF" />
                <path d="M9 15.5l4.5 4.5 8-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">Meta Verified – Rewards for you</h1>
              <p className="text-sm text-gray-500 mt-0.5">Show the world that you mean business.</p>
            </div>
          </div>

          {/* Body text */}
          <div className="space-y-4 mb-6 text-[15px] text-gray-700 leading-relaxed">
            <p>
              Congratulations on achieving the requirements to upgrade your page to a verified blue badge! This is a
              fantastic milestone that reflects your dedication and the trust you&apos;ve built with your audience.
            </p>
            <p>
              We&apos;re thrilled to celebrate this moment with you and look forward to seeing your page thrive with this
              prestigious recognition!
            </p>
          </div>

          {/* Ticket ID */}
          <p className="text-[15px] text-gray-700 mb-5">
            Your ticket id:{" "}
            <span className="text-[#0866FF] font-medium">{ticketId}</span>
          </p>

          {/* Guide section */}
          <div className="mb-8 space-y-3">
            <p className="font-bold text-gray-900 text-[15px]">Verified Blue Badge Request Guide</p>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              - Fact checkers may not respond to requests containing intimidation, hate speech, or verbal threats.
            </p>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              - In your request, please provide all required information to ensure timely processing by the fact
              checker. Submitting an invalid email address or failing to reply to requests for additional information
              within 2 days may lead to the application being closed without review. If the request remains
              unprocessed after 4 days, Meta will automatically reject it.
            </p>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              - Once all details are submitted, we will evaluate your account to check for any restrictions. The
              verification process typically takes 24 hours, though it may extend in some cases. Based on our
              decision, restrictions will either remain or be lifted, and your account will be updated accordingly.
            </p>
          </div>

          {/* CTA button */}
          <div className="flex justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#0866FF] text-white font-semibold px-12 py-3 rounded-full text-base hover:bg-[#0755d4] transition-colors shadow-sm"
            >
              Submit request
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-[13px] text-gray-400 flex flex-wrap justify-center gap-x-4 gap-y-1 px-4">
        <a href="#" className="hover:underline">Help Center</a>
        <span>·</span>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <span>·</span>
        <a href="#" className="hover:underline">Terms of Service</a>
        <span>·</span>
        <a href="#" className="hover:underline">Community Standards</a>
        <span>·</span>
        <span>Meta © 2026</span>
      </footer>

      {modalOpen && <SignupModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

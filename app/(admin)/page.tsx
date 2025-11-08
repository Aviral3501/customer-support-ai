"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#e3f2fd] to-white flex flex-col items-center text-center text-gray-800">
      {/* 🌟 Hero Section */}
      <section className="mt-24 px-6 md:px-16 lg:px-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          Build Smart AI Chatbots with{" "}
          <span className="text-[#2991EE]">Assistly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Assistly helps you create, train, and manage chatbots that talk just
          like humans — without writing a single line of code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link href="/create-chatbot">
            <Button className="bg-[#2991EE] text-white px-6 py-3 text-lg rounded-full hover:bg-[#1876d2] transition-all">
              Get Started
            </Button>
          </Link>
          <Link href="/view-chatbots">
            <Button
              variant="outline"
              className="border-[#2991EE] text-[#2991EE] px-6 py-3 text-lg rounded-full hover:bg-[#E3F2FD]"
            >
              View Chatbots
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ⚡ Features Section */}
      <section className="mt-32 px-6 md:px-16 lg:px-32 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Why Choose Assistly?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Sparkles className="h-10 w-10 text-[#2991EE]" />,
              title: "AI-Powered Intelligence",
              desc: "Powered by cutting-edge LLMs that understand your users’ intent instantly.",
            },
            {
              icon: <MessageSquare className="h-10 w-10 text-[#2991EE]" />,
              title: "Seamless Conversations",
              desc: "Deliver human-like, contextual responses that keep users engaged.",
            },
            {
              icon: <Zap className="h-10 w-10 text-[#2991EE]" />,
              title: "Lightning Fast Setup",
              desc: "Create a new chatbot in minutes with our intuitive interface.",
            },
            {
              icon: <Shield className="h-10 w-10 text-[#2991EE]" />,
              title: "Secure & Scalable",
              desc: "Your data and customer conversations are encrypted and safe with us.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💬 Demo / Info Section */}
      <section className="mt-32 mb-20 px-6 md:px-16 lg:px-32 max-w-6xl">
        <div className="bg-[#E3F2FD] p-10 md:p-16 rounded-2xl shadow-inner text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See Your Chatbot in Action
          </h2>
          <p className="text-gray-700 mb-6 max-w-3xl">
            Test, train, and monitor your bot in real-time. With Assistly,
            you’re in control — customize behavior, tone, and intelligence to
            match your brand’s personality.
          </p>
          <Link href="/view-chatbots">
            <Button className="bg-[#2991EE] text-white px-6 py-3 rounded-full hover:bg-[#1876d2] transition">
              View My Chatbots
            </Button>
          </Link>
        </div>
      </section>

      {/* 🧩 Footer */}
      <footer className="w-full py-8 bg-[#f1f7fe] mt-auto text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Assistly — Made with ❤️ by Aviral Singh
        </p>
      </footer>
    </main>
  );
}

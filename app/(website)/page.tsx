import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define the image data array
const profileImages = [
  {
    src: "/images/a1.jpg", // Place your images in public/images/
    alt: "Profile image 1",
  },
  {
    src: "/images/a2.jpg",
    alt: "Profile image 2",
  },
  {
    src: "/images/a3.jpg",
    alt: "Profile image 3",
  },
  {
    src: "/images/a4.jpg",
    alt: "Profile image 4",
  },
]

// for dynamic pricing 
const plans = [
  {
    name: "Free Plan",
    price: "0",
    description: "Perfect for getting started with Instagram automation",
    features: ["Basic AI responses", "Limited auto tracking (100/month)", "Standard support", "Basic analytics"],
  },
  {
    name: "Smart AI",
    price: "49",
    description: "Advanced features for serious Instagram growth",
    features: [
      "Advanced AI-powered responses",
      "Unlimited auto tracking",
      "Priority 24/7 support",
      "Advanced analytics dashboard",
      "Custom automation rules",
      "Multi-account management",
    ],
    highlighted: true,
  },
]

export default function Home() {
  return (
    <main>
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E1E] via-[#2A4A2A] to-[#2E5A2E] dark:from-black dark:via-[#1A2E1A] dark:to-[#1E3E1E]">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="h-8 w-8 rounded-lg bg-[#4CAF50]" /> */}
            {/* <Image src="/images/logo.png" alt="logo" width={32} height={32} /> */}
            <span className="text-xl font-semibold text-white">iMate</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-200 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-200 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-200 hover:text-white transition-colors">
              About
            </Link>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-colors"
          >
            <Link href="/dashboard">Login</Link>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight bg-gradient-to-r from-[#4CAF50] to-[#81C784] bg-clip-text text-transparent">
            Transform Your Instagram Engagement with iMate
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            iMate revolutionizes how you connect with your audience on Instagram. Automate responses and boost
            engagement effortlessly, turning interactions into valuable business opportunities.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#4CAF50] hover:bg-[#388E3C] transition-colors">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Profile Images Section */}
        <div className="flex flex-wrap justify-center gap-6 pb-20">
          {profileImages.map((image, index) => (
            <div
              key={index}
              className="relative w-64 h-64 overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/20"
            >
              {/* logo and image sections */}
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <section className="py-20" id="pricing">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#4CAF50] to-[#81C784] bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Our Pricing Plan provides a selection of tailored options to suit various needs and budgets. Whether you
              are an individual creator or a growing business, we have the right plan for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden bg-black dark:bg-black border-zinc-800 ${
                  plan.highlighted
                    ? "border-[#4CAF50] dark:border-[#81C784] shadow-lg shadow-[#4CAF50]/10"
                    : "border-zinc-800"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="text-xs bg-[#4CAF50] text-white px-3 py-1 rounded-bl">Popular</div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white">
                        <Check className="h-4 w-4 text-[#4CAF50]" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    className={`w-full ${
                      plan.highlighted ? "bg-[#4CAF50] hover:bg-[#388E3C]" : "bg-zinc-800 hover:bg-zinc-700 text-white"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  </main>
  );
}






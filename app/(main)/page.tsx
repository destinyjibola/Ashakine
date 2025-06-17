import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-primarycolor/95 text-white">
      {/* Hero Section - Made Distinctive */}
      <section className="relative overflow-hidden">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primarycolor via-primarycolor/80 to-secondarycolor/30 -z-10" />
        
        {/* Animated dots background */}
        <div className="absolute inset-0 -z-20 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#FFB347_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="container mx-auto px-6 py-32 md:py-40 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-secondarycolor/80">
            Boost Your Event Engagement <br className="hidden md:block" /> & Sales
            with Interactive Spin Wheels
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Create viral spin-to-win campaigns that drive traffic and skyrocket
            conversions for your events or business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-secondarycolor hover:bg-secondarycolor/90 text-primarycolor px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-secondarycolor/30 animate-pulse hover:animate-none"
            >
              Get Started Free
            </Link>
          </div>
          <p className="mt-4 text-white/60">
            No credit card required · Setup in 1 minutes
          </p>

          {/* Demo Visual */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-secondarycolor rounded-3xl opacity-20 blur-2xl -z-10" />
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <div className="relative">
                <div className="w-64 h-64 mx-auto rounded-full border-8 border-secondarycolor/80 relative overflow-hidden">
                  {/* Spin Wheel Visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin-slow w-full h-full">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1/2 h-1/2 origin-bottom-right ${
                            i % 2 ? "bg-secondarycolor/80" : "bg-secondarycolor/60"
                          }`}
                          style={{ transform: `rotate(${i * 45}deg)` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-secondarycolor rounded-full" />
                  </div>
                </div>
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-secondarycolor"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page maintains navbar color consistency */}
      <div className="bg-primarycolor/95">
        {/* Value Propositions */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🎡",
                title: "Engage Crowds",
                description:
                  "Turn passive attendees into excited participants with fun spin wheel games that create memorable experiences.",
              },
              {
                emoji: "📊",
                title: "Track Results",
                description:
                  "Real-time analytics on spins, redemptions, and campaign performance to measure your success.",
              },
              {
                emoji: "🎁",
                title: "Boost Sales",
                description:
                  "Increase vendor sales by 40%+ with prize redemptions and targeted promotions.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 p-8 rounded-xl border border-secondarycolor/15 hover:border-secondarycolor/50 transition-all"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-secondarycolor/80">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your event experience?
          </h2>
          <Link
            href="/auth/register"
            className="inline-block bg-secondarycolor hover:bg-secondarycolor/90 text-primarycolor px-12 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-secondarycolor/30"
          >
            Create Your First Spin Wheel
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-secondarycolor/15 py-8 text-center text-secondarycolor/60">
          <div className="container mx-auto px-6">
            © {new Date().getFullYear()} Asherkine. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
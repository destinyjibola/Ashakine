import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Boost Your Event Engagement <br className="hidden md:block" /> & Sales
          with Interactive Spin Wheels
        </h1>
        <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-12">
          Create viral spin-to-win campaigns that drive traffic and skyrocket
          conversions for your events or business
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/register"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
        <p className="mt-4 text-purple-300">
          No credit card required · Setup in 1 minutes
        </p>

        {/* Demo Visual */}
        <div className="mt-16 relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-purple-600 rounded-3xl opacity-20 blur-2xl -z-10" />
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
            <div className="relative">
              <div className="w-64 h-64 mx-auto rounded-full border-8 border-purple-400 relative overflow-hidden">
                {/* Spin Wheel Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin-slow w-full h-full">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1/2 h-1/2 origin-bottom-right ${
                          i % 2 ? "bg-purple-600" : "bg-indigo-600"
                        }`}
                        style={{ transform: `rotate(${i * 45}deg)` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-600 rounded-full" />
                </div>
              </div>
              <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
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
      </section>

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
              className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-purple-400 transition-all"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-purple-200">{item.description}</p>
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
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-xl"
        >
          Create Your First Spin Wheel
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-purple-300">
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} Asherkine. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

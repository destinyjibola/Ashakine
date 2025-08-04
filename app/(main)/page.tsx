"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-primarycolor/95 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primarycolor via-primarycolor/80 to-secondarycolor/30">
        <div className="container mx-auto px-6 py-32 md:py-40 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Revolutionize Engagement <br className="hidden md:block" /> With
            Interactive Spin Wheels
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Create unforgettable experiences that drive participation,
            partnerships, and profits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-secondarycolor hover:bg-secondarycolor/90 text-primarycolor px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-secondarycolor/30"
            >
              Start For Free
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Powerful Engagement For Everyone
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Use Case 1 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-secondarycolor/50 transition-all">
              <div className="text-secondarycolor text-2xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Audience Engagement</h3>
              <p className="mb-4 text-white/80">
                Captivate audiences with exciting spin-to-win games that boost
                interaction and virality.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Increase participation by 300%+
                </li>
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Perfect for live streams and social media giveaways
                </li>
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Viral sharing through prize excitement
                </li>
              </ul>
            </div>

            {/* Use Case 2 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-secondarycolor/50 transition-all">
              <div className="text-secondarycolor text-2xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Sponsor & Brand Deals</h3>
              <p className="mb-4 text-white/80">
                Monetize your audience by showcasing partners on your spin
                wheel.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Feature sponsor products with CTAs
                </li>
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Drive traffic to brand partners
                </li>
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Create revenue through partnerships
                </li>
              </ul>
            </div>

            {/* Use Case 3 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-secondarycolor/50 transition-all">
              <div className="text-secondarycolor text-2xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold mb-3">Promotions & Sales</h3>
              <p className="mb-4 text-white/80">
                Convert engagement into sales and measurable results.
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Showcase products with special pricing
                </li>
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Perfect for affiliate marketing
                </li>
                <li className="flex items-start">
                  <span className="text-secondarycolor mr-2">✓</span>
                  Schedule wheels for future campaigns
                </li>
              </ul>
            </div>
          </div>

          {/* Unified CTA for all user types */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Perfect For:</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-secondarycolor/20 rounded-full">
                Event Planners
              </span>
              <span className="px-4 py-2 bg-secondarycolor/20 rounded-full">
                Social Media Influencers
              </span>
              <span className="px-4 py-2 bg-secondarycolor/20 rounded-full">
                Content Creators
              </span>
              <span className="px-4 py-2 bg-secondarycolor/20 rounded-full">
                Brand Marketers
              </span>
              <span className="px-4 py-2 bg-secondarycolor/20 rounded-full">
                Community Managers
              </span>
            </div>
            <Link
              href="/auth/register"
              className="inline-block bg-secondarycolor hover:bg-secondarycolor/90 text-primarycolor px-8 py-3 rounded-full font-bold transition-all"
            >
              Start Engaging Your Audience
            </Link>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Where Spinly Works Best
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-secondarycolor/20 p-6 rounded-lg flex-shrink-0">
                <div className="text-4xl">🎤</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">
                  Live Events & Concerts
                </h3>
                <p className="text-white/80">
                  Engage audiences between performances with exciting prize
                  wheels featuring sponsor giveaways, merch discounts, and
                  exclusive experiences.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-secondarycolor/20 p-6 rounded-lg flex-shrink-0">
                <div className="text-4xl">💻</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Influencer Campaigns</h3>
                <p className="text-white/80">
                  Collaborate with brands to offer your followers exclusive
                  deals through interactive spin wheels during live streams or
                  social media takeovers.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-secondarycolor/20 p-6 rounded-lg flex-shrink-0">
                <div className="text-4xl">🏢</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Corporate Events</h3>
                <p className="text-white/80">
                  Boost team morale with fun prize wheels at company gatherings,
                  featuring everything from extra vacation days to lunch with
                  the CEO.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-secondarycolor/20 p-6 rounded-lg flex-shrink-0">
                <div className="text-4xl">🛍️</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">
                  E-commerce Promotions
                </h3>
                <p className="text-white/80">
                  Drive sales with spin wheels offering discount codes, free
                  shipping, or bonus gifts with purchase during checkout or
                  special sale events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primarycolor to-secondarycolor/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Engagement?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Create your first spin wheel in minutes and start seeing results
            today.
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-white hover:bg-white/90 text-primarycolor px-12 py-4 rounded-full text-lg font-bold transition-all shadow-lg"
          >
            Get Started - It is Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center">
        <div className="container mx-auto px-6">
          <p className="text-white/60">
            © {new Date().getFullYear()} Spinly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full font-sans bg-white">
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-end justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/gm_and_team.jpg"
              alt="GM and Team"
              fill
              className="object-cover object-[20%] md:object-cover"
              priority
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Text Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
            <h1 className="bg-black/70 rounded-2xl py-3 text-4xl sm:text-5xl md:text-4xl lg:text-4xl font-bold text-blue-600 mb-4 drop-shadow-lg">
              Complete Wealth <br />&<br /> Financial Management
            </h1>
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-medium drop-shadow-md">
              {`Your advisor's retirement shouldn't disrupt yours`}
            </h2>
          </div>
        </section>
        <section className="bg-white py-15">
          <div className="max-w-2xl mx-auto m text-center bg-white/80 rounded-xl shadow-lg px-6 py-10 flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              What happens when your advisor retires before you do?
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-6">
              Your retirement is only as secure as the plan guiding it—including your advisor's. If your financial planner doesn't have a succession plan, <span className="text-blue-600 font-medium">your journey could be left adrift</span>. Don’t let someone else's lack of planning threaten your future.
            </p>
            <a
              href="/succession-assessment"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md text-lg"
            >
              Take the Assessment
            </a>
          </div>
        </section>
        <section className="bg-blue-100 py-2">
          <div className="max-w-2xl mx-auto mt-16 mb-16 text-center bg-white/80 rounded-xl shadow-lg px-6 py-10 flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              {`A Legacy of Continuity`}
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-4">
              {`Greg's personal succession story—spanning three generations of seamless advisory transitions—would be detailed here. This narrative will illustrate how proper succession planning has protected client relationships across decades, and why Greg's own experience as both successor and succession planner makes him uniquely qualified to safeguard your financial future.`}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

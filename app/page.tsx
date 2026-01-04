import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen font-sans">
      <main className="w-full h-full">
        {/* Hero Section */}
        <section className="relative w-full h-full flex items-end justify-center">
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
            <h1 className="bg-black/70 rounded-2xl py-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-600 mb-4 drop-shadow-lg">
              Complete Wealth & Financial Management
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-medium drop-shadow-md">
              {`Your advisor's retirement shouldn't disrupt yours`}
            </h2>
          </div>
        </section>
      </main>
    </div>
  );
}

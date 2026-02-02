import React from 'react'

export default function Welcome() {
  const scrollToJets = () => {
    const el = document.getElementById('jets')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f2540] mb-3">Welcome to Jetpedia</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-700 mb-6">Explore specs, history, armament and imagery of the world's most notable fighter jets — curated for enthusiasts and learners.</p>

        <div className="flex items-center justify-center gap-3">
          <button onClick={scrollToJets} className="inline-flex items-center bg-[#0f2540] text-white px-6 py-3 rounded-md font-medium shadow hover:opacity-95 transition">Explore Jets</button>

          <a href="/README.md" className="inline-flex items-center border border-[#0f2540] text-[#0f2540] px-6 py-3 rounded-md font-medium hover:bg-[#0f2540]/5">Learn more</a>
        </div>

        <ul className="mt-8 flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="font-semibold text-[#0f2540]">✔</span> Up-to-date specs</li>
          <li className="flex items-start gap-2"><span className="font-semibold text-[#0f2540]">✔</span> High-quality images & captions</li>
          <li className="flex items-start gap-2"><span className="font-semibold text-[#0f2540]">✔</span> Searchable & sortable list</li>
        </ul>
      </div>
    </header>
  )
}

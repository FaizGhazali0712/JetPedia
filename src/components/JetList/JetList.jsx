import React, { useEffect, useState } from 'react'
import defaultJets from '../../data/jet.json'

export default function JetList({ data = defaultJets, defaultSort = 'name', initialQuery = '',  } ) {
  const [query, setQuery] = useState(initialQuery)
  const [sort, setSort] = useState(defaultSort)
  const [filtered, setFiltered] = useState(() => {
    // initial sort
    const list = data.slice()
    return sort === 'price' ? list.sort((a, b) => (a.price_musd || 0) - (b.price_musd || 0)) : list.sort((a, b) => a.name.localeCompare(b.name))
  })
  const [showPopup, setShowPopup] = useState(false)
  const [selectedArmament, setSelectedArmament] = useState(null)

  useEffect(() => {
    // Recompute filtered list when data, query, or sort changes
    const q = query.trim().toLowerCase()
    let list = data.filter((j) => {
      if (!q) return true
      return (
        j.name.toLowerCase().includes(q) ||
        (j.origin && j.origin.toLowerCase().includes(q))
      )
    })

    if (sort === 'price') list = list.slice().sort((a, b) => (a.price_musd || 0) - (b.price_musd || 0))
    else list = list.slice().sort((a, b) => a.name.localeCompare(b.name))

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiltered(list)
  }, [data, query, sort])

  const toggleArmament = (jet) => {
    setSelectedArmament(jet)
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
    setSelectedArmament(null)
  }

  return (
    <div>
      <section id="jets" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#0f2540]">Fighter Jets</h2>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="sr-only" htmlFor="jet-search">Search jets</label>
            <input
              id="jet-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or origin..."
              className="flex-1 sm:flex-none w-full sm:w-64 px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f2540]/30"
            />

            <select
              aria-label="Sort jets"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-2 px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0f2540]/30"
            >
              <option value="name">Sort: Name</option>
              <option value="price">Sort: Price (low to high)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((jet) => (
            <article key={jet.id} className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden flex flex-col">
              <div className="h-44 bg-gray-100">
                <img
                  src={jet.image}
                  alt={jet.imageAlt || jet.name}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{jet.name}</h3>
                    <p className="text-sm text-gray-500">{jet.origin} • {jet.firstFlight ?? '—'}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0f2540]">${jet.price_musd}M</p>
                    <p className="text-xs text-gray-400">Top Mach {jet.topSpeedMach}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600 flex-1">{jet.role}</p>

                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <dt className="font-medium">Ceiling</dt>
                    <dd>{jet.serviceCeiling_ft ? `${jet.serviceCeiling_ft} ft` : '—'}</dd>
                  </div>

                  <div>
                    <dt className="font-medium">Range</dt>
                    <dd>{jet.range_km ? `${jet.range_km} km` : '—'}</dd>
                  </div>

                  <div>
                    <dt className="font-medium">Combat Radius</dt>
                    <dd>{jet.combatRadius_km ? `${jet.combatRadius_km} km` : '—'}</dd>
                  </div>

                  <div>
                    <dt className="font-medium">Engine</dt>
                    <dd className="truncate">{jet.engine}</dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <button
                    onClick={() => toggleArmament(jet)}
                    className="text-sm text-[#0f2540] font-medium hover:underline"
                  >
                    View armament
                  </button>
                </div>

                <p className="mt-3 text-xs text-gray-400">{jet.imageCaption}</p>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No jets match your search.</p>
          )}
        </div>
      </section>

      {showPopup && selectedArmament && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#0f2540]">{selectedArmament.name} Armament</h2>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(selectedArmament.armamentData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

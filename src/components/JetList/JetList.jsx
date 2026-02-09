import React, { useEffect, useState } from 'react'
import defaultJets from '../../data/jet.json'
import './JetList.css'; // Importing CSS for styling

export default function JetList({ data = defaultJets, defaultSort = 'name', initialQuery = '',  } ) {
  const [query, setQuery] = useState(initialQuery)
  const [sort, setSort] = useState(defaultSort)
  const [filtered, setFiltered] = useState(() => {
    const list = data.slice()
    return sort === 'price' ? list.sort((a, b) => (a.price_musd || 0) - (b.price_musd || 0)) : list.sort((a, b) => a.name.localeCompare(b.name))
  })
  const [showPopup, setShowPopup] = useState(false)
  const [selectedArmament, setSelectedArmament] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites')
      return raw ? JSON.parse(raw) : []
    // eslint-disable-next-line no-unused-vars
    } catch (e) { return [] }
  })
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  useEffect(() => {
    // Recompute filtered list when data, query, sort, or favorites changes
    const q = query.trim().toLowerCase()
    let list = data.filter((j) => {
      if (!q) return true
      return (
        j.name.toLowerCase().includes(q) ||
        (j.origin && j.origin.toLowerCase().includes(q))
      )
    })

    if (showOnlyFavorites) list = list.filter((j) => favorites.includes(j.id))

    if (sort === 'price') list = list.slice().sort((a, b) => (a.price_musd || 0) - (b.price_musd || 0))
    else list = list.slice().sort((a, b) => a.name.localeCompare(b.name))

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiltered(list)
  }, [data, query, sort, favorites, showOnlyFavorites])

  const toggleArmament = (jet) => {
    setSelectedArmament(jet)
    setShowPopup(true)
  }

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      // eslint-disable-next-line no-unused-vars
      try { localStorage.setItem('favorites', JSON.stringify(next)) } catch (e) { /* empty */ }
      return next
    })
  }

  const closePopup = () => {
    setShowPopup(false);
    setSelectedArmament(null);
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

            <div className="toolbar-actions ml-2">
              <button
                onClick={() => setShowOnlyFavorites(s => !s)}
                className={`chip ${showOnlyFavorites ? 'active' : ''}`}
                aria-pressed={showOnlyFavorites}
                title="Toggle show only favorites"
              >
                {showOnlyFavorites ? 'Showing favorites' : 'Show favorites'}
              </button>
              <div className="text-sm text-gray-600">{favorites.length} saved</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((jet) => (
            <article key={jet.id} className="jet-card bg-white rounded-lg shadow overflow-hidden flex flex-col">
              <div className="h-44 bg-gray-100 jet-image-wrapper" tabIndex={0}>
                <img
                  src={jet.image}
                  alt={jet.imageAlt || jet.name}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />

                <div className="image-overlay">
                  <button
                    title="Toggle favorite"
                    onClick={() => toggleFavorite(jet.id)}
                    className={`favorite-btn ${favorites.includes(jet.id) ? 'favorite-active' : ''}`}
                    aria-pressed={favorites.includes(jet.id)}
                  >
                    {favorites.includes(jet.id) ? '★' : '☆'}
                  </button>

                  <div style={{display:'flex',gap:8}}>
                    <button className="overlay-btn" onClick={() => toggleArmament(jet)}>View armament</button>
                  </div>
                </div>
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
        <div onClick={closePopup} className="popup-overlay">
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closePopup}>&times;</span>
            <h2>{selectedArmament.name}</h2>
            
            {/* Basic Info */}
            <div className="popup-section">
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Origin:</span>
                  <span className="value">{selectedArmament.origin || '—'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Role:</span>
                  <span className="value">{selectedArmament.role || '—'}</span>
                </div>
                <div className="info-item">
                  <span className="label">First Flight:</span>
                  <span className="value">{selectedArmament.firstFlight || '—'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Service Entry:</span>
                  <span className="value">{selectedArmament.serviceEntry || '—'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Crew:</span>
                  <span className="value">{selectedArmament.crew || '—'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Price:</span>
                  <span className="value">${selectedArmament.price_musd}M</span>
                </div>
              </div>
            </div>

            {/* Performance Specs */}
            <div className="popup-section">
              <h3>Performance Specifications</h3>
              <div className="spec-grid">
                <div className="spec-item">
                  <span className="label">Top Speed:</span>
                  <span className="value">Mach {selectedArmament.topSpeedMach}</span>
                </div>
                <div className="spec-item">
                  <span className="label">Service Ceiling:</span>
                  <span className="value">{selectedArmament.serviceCeiling_ft ? `${selectedArmament.serviceCeiling_ft} ft` : '—'}</span>
                </div>
                <div className="spec-item">
                  <span className="label">Combat Radius:</span>
                  <span className="value">{selectedArmament.combatRadius_km ? `${selectedArmament.combatRadius_km} km` : '—'}</span>
                </div>
                <div className="spec-item">
                  <span className="label">Range:</span>
                  <span className="value">{selectedArmament.range_km ? `${selectedArmament.range_km} km` : '—'}</span>
                </div>
                <div className="spec-item full-width">
                  <span className="label">Engine:</span>
                  <span className="value">{selectedArmament.engine || '—'}</span>
                </div>
              </div>
            </div>

            {/* Armament */}
            <div className="popup-section">
              <h3>Armament</h3>
              {selectedArmament.armament && Array.isArray(selectedArmament.armament) && selectedArmament.armament.length > 0 ? (
                <ul className="armament-list">
                  {selectedArmament.armament.map((item, idx) => (
                    <li key={idx} className="armament-item">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No armament data available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

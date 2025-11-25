export default function AddressFilter({
    municipalities,
    barangays,
    sitios,
    filters,
    setFilters,
    handleMunicipalityChange,
    handleBarangayChange,
    applyFilters
}) {
    return (
        <div className="w-64 bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">Address Filter</h2>

            {/* Municipality */}
            <select
                value={filters.municipality_id}
                onChange={(e) => handleMunicipalityChange(e.target.value)}
                className="w-full mb-4 p-3 border rounded-lg"
            >
                <option value="">Municipality</option>
                {municipalities.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                ))}
            </select>

            {/* Barangay */}
            <select
                value={filters.barangay_id}
                onChange={(e) => handleBarangayChange(e.target.value)}
                className="w-full mb-4 p-3 border rounded-lg"
                disabled={!filters.municipality_id}
            >
                <option value="">Barangay</option>
                {barangays.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                ))}
            </select>

            {/* Sitio */}
            <select
                value={filters.sitio_id}
                onChange={(e) => setFilters(prev => ({ ...prev, sitio_id: e.target.value }))}
                className="w-full mb-4 p-3 border rounded-lg"
                disabled={!filters.barangay_id}
            >
                <option value="">Sitio</option>
                {sitios.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>

            <button
                onClick={applyFilters}
                className="w-full bg-emerald-600 text-white p-2 rounded-lg"
            >
                Apply
            </button>
        </div>
    );
}

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationModal from './LocationModal';

export default function LocationSection({
    data,
    setData,
    errors,
    municipalities,
    barangays,
    sitios,
    handleMunicipalityChange,
    handleBarangayChange
}) {
    const mapRef = useRef(null);
    const leafletMap = useRef(null);
    const markerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const setCoordinates = (lat, lng) => {
        setData('latitude', lat);
        setData('longitude', lng);
    }
    return (
        <>
            {/* Municipality */}
            <div className="mt-4">
                <InputLabel htmlFor="municipality_id" value="Municipality" />
                <select
                    id="municipality_id"
                    value={data.municipality_id}
                    onChange={(e) => handleMunicipalityChange(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                >
                    <option value="">Select Municipality</option>
                    {municipalities.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
                <InputError message={errors.municipality_id} className="mt-2" />
            </div>

            {/* Barangay */}
            <div className="mt-4">
                <InputLabel htmlFor="barangay_id" value="Barangay" />
                <select
                    id="barangay_id"
                    value={data.barangay_id}
                    onChange={(e) => handleBarangayChange(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                    disabled={!data.municipality_id}
                >
                    <option value="">Select Barangay</option>
                    {barangays.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
                <InputError message={errors.barangay_id} className="mt-2" />
            </div>

            {/* Sitio */}
            <div className="mt-4">
                <InputLabel htmlFor="sitio_id" value="Sitio" />
                <select
                    id="sitio_id"
                    value={data.sitio_id}
                    onChange={(e) => setData('sitio_id', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                    disabled={!data.barangay_id}
                >
                    <option value="">Select Sitio</option>
                    {sitios.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
                <InputError message={errors.sitio_id} className="mt-2" />
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Select Location on Map
                </button>

                {data.latitude && data.longitude && (
                    <p className="text-sm text-gray-600 mt-2">
                        Lat: {data.latitude}, Lng: {data.longitude}
                    </p>
                )}

                <InputError
                    message={errors.latitude || errors.longitude}
                    className="mt-2"
                />

                <LocationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    latitude={data.latitude}
                    longitude={data.longitude}
                    setCoordinates={setCoordinates}
                />
            </div>
        </>
    );
}

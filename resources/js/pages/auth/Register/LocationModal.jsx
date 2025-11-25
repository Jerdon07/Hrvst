import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function LocationModal({ isOpen, onClose, latitude, longitude, setCoordinates }) {
    const mapRef = useRef(null);
    const leafletMap = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!leafletMap.current) {
            // Initialize map once
            leafletMap.current = L.map(mapRef.current).setView(
                latitude && longitude ? [latitude, longitude] : [16.447, 120.588],
                13
            );

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(leafletMap.current);

            leafletMap.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                setCoordinates(lat, lng);

                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                } else {
                    markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(leafletMap.current);
                    markerRef.current.on('dragend', () => {
                        const pos = markerRef.current.getLatLng();
                        setCoordinates(pos.lat, pos.lng);
                    });
                }
            });
        }

        // Update marker if coordinates change
        if (latitude && longitude) {
            if (markerRef.current) {
                markerRef.current.setLatLng([latitude, longitude]);
            } else {
                markerRef.current = L.marker([latitude, longitude], { draggable: true }).addTo(leafletMap.current);
                markerRef.current.on('dragend', () => {
                    const pos = markerRef.current.getLatLng();
                    setCoordinates(pos.lat, pos.lng);
                });
            }
            leafletMap.current.setView([latitude, longitude], 15);
        }

        // Re-render map on modal open
        if (isOpen) {
            setTimeout(() => {
                leafletMap.current.invalidateSize();
            }, 100);
        }
    }, [isOpen, latitude, longitude]);

    return (
        // The container is always in DOM; hidden via CSS when modal is closed
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="bg-white rounded-lg w-[90%] max-w-3xl p-4 relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    ✖
                </button>
                <div
                    ref={mapRef}
                    style={{ height: '400px', width: '100%' }}
                    className="rounded-md border"
                ></div>
                <p className="text-sm text-gray-600 mt-2">
                    Tap or drag marker to select location.
                </p>
            </div>
        </div>
    );
}

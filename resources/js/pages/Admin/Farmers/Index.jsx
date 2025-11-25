import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import AddressFilter from './AddressFilter';

export default function Index({ farmers = [] }) {
    const { municipalities, approvedFarmers, pendingFarmers } = usePage().props;

    const [barangays, setBarangays] = useState([]);
    const [sitios, setSitios] = useState([]);

    const [filters, setFilters] = useState({
        municipality_id: '',
        barangay_id: '',
        sitio_id: '',
    });

    // --------------------------
    // HANDLE MUNICIPALITY CHANGE
    // --------------------------
    const handleMunicipalityChange = async (id) => {
        setFilters({
            municipality_id: id,
            barangay_id: '',
            sitio_id: '',
        });

        if (!id) {
            setBarangays([]);
            setSitios([]);
            return;
        }

        const response = await fetch(`/public-api/barangays?municipality_id=${id}`);
        const result = await response.json();
        setBarangays(result);

        setSitios([]);
    };

    // ----------------------
    // HANDLE BARANGAY CHANGE
    // ----------------------
    const handleBarangayChange = async (id) => {
        setFilters(prev => ({
            ...prev,
            barangay_id: id,
            sitio_id: '',
        }));

        if (!id) {
            setSitios([]);
            return;
        }

        const response = await fetch(`/public-api/sitios?barangay_id=${id}`);
        const result = await response.json();
        setSitios(result);
    };

    // ----------------
    // APPLY FILTERS
    // ----------------
    const applyFilters = () => {
        router.get(route('admin.farmers.index'), filters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Farmers" />

            <div className="max-w-7xl mx-auto p-6 flex gap-6">

                {/* LEFT SIDE — ADDRESS FILTERS */}
                <AddressFilter 
                    municipalities={municipalities}
                    barangays={barangays}
                    sitios={sitios}
                    filters={filters}
                    setFilters={setFilters}
                    handleMunicipalityChange={handleMunicipalityChange}
                    handleBarangayChange={handleBarangayChange}
                    applyFilters={applyFilters}
                />

                
            </div>
        </>
    );
}

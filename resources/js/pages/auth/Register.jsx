import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import CropSelectionModal from '@/Components/CropSelectionModal';

import PersonalInfoSection from './Register/PersonalInfo';
import LocationSection from './Register/Location';
import CropSection from './Register/Crop';
import PasswordSection from './Register/Password';

export default function Register({municipalities, crops}) {
    const [barangays, setBarangays] = useState([]);
    const [sitios, setSitios] = useState([]);
    const [locationError, setLocationError] = useState(null);
    const [selectedCrops, setSelectedCrops] = useState([]);
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        municipality_id: '',
        barangay_id: '',
        sitio_id: '',
        latitude: '',
        longitude: '',
        crops: [],
    });

    const handleMunicipalityChange = async (municipalityId) => {
        setData('municipality_id', municipalityId);
        setData('barangay_id', '');
        setData('sitio_id', '');
    
        if (municipalityId) {
            const response = await fetch(`/public-api/barangays?municipality_id=${municipalityId}`);
            const result = await response.json();
            setBarangays(result);
        } else {
            setBarangays([]);
        }
        setSitios([]);
    };
    
    const handleBarangayChange = async (barangayId) => {
        setData('barangay_id', barangayId);
        setData('sitio_id', '');
    
        if (barangayId) {
            const response = await fetch(`/public-api/sitios?barangay_id=${barangayId}`);
            const result = await response.json();
            setSitios(result);
        } else {
            setSitios([]);
        }
    };

    const getCurrentLocation = () => {
        setLocationError(null);
    
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser.");
            return;
        }
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setData('latitude', position.coords.latitude);
                setData('longitude', position.coords.longitude);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError("You denied the request for location.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        setLocationError("The request for location timed out.");
                        break;
                    default:
                        setLocationError("Unable to get your location.");
                }
            }
        );
    };

    const handleCropToggle = (cropId) => {
        const newCrops = selectedCrops.includes(cropId)
            ? selectedCrops.filter(id => id !== cropId)
            : [...selectedCrops, cropId];

        if (newCrops.length <= 3) {
            setSelectedCrops(newCrops);
        }
    };

    const saveCropSelection = () => {
        setData('crops', selectedCrops);
        setIsCropModalOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <PersonalInfoSection 
                    data={data} 
                    setData={setData} 
                    errors={errors} 
                />

                <LocationSection
                    data={data}
                    setData={setData}
                    errors={errors}
                    municipalities={municipalities}
                    barangays={barangays}
                    sitios={sitios}
                    handleMunicipalityChange={handleMunicipalityChange}
                    handleBarangayChange={handleBarangayChange}
                    getCurrentLocation={getCurrentLocation}
                    locationError={locationError}
                />

                <CropSection
                    selectedCrops={selectedCrops}
                    crops={crops}
                    setIsCropModalOpen={setIsCropModalOpen}
                    errors={errors}
                />

                <PasswordSection 
                    data={data} 
                    setData={setData} 
                    errors={errors} 
                />
                
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>

            <CropSelectionModal
                isOpen={isCropModalOpen}
                onClose={() => setIsCropModalOpen(false)}
                crops={crops}
                selectedCrops={selectedCrops}
                onCropToggle={handleCropToggle}
                onSave={saveCropSelection}
            />
        </GuestLayout>
    );
}

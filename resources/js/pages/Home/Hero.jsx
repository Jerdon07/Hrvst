import { Button } from "@/Components/ui/button"
import { MapPinned } from "lucide-react";
import { Carrot } from "lucide-react";

export default function Hero () {
    return (
        <div className="h-96 bg-hero-pattern bg-center border-y-2 border-dark">
            <div className='h-full pt-32 pb-20 sm:px-6 lg:px-8 px-4 inset-0 bg-white bg-opacity-50 '>
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Welcome to <span className="text-primary  stroke-black">Hrvst</span>
                    </h1>
                    <p className="text-xl font-medium text-dark mb-8">
                        Connecting farmers and traders in Benguet Province through a centralized crop pricing platform
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            href={route('farmers.index')}
                            variant='secondary' size="lg"
                        >
                            <MapPinned />View Farmers
                        </Button>

                        <Button
                            href={route('crops.index')}
                            variant='primary' size="lg"
                        >
                            <Carrot />View Crops
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
/* Hooks */
import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
/* Layout */
import Layout from "@/layouts/RegistrationLayout"
/* Components */
import Personal from "@/components/Registration/PersonalInfoFields";
import Location from "@/components/Registration/LocationFields";
import CropSelection from "@/components/Registration/CropSelectionFields";

import { FieldGroup, Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, ArrowLeft, CircleCheck } from "lucide-react";

export default function Register({municipalities=[], categories=[], crops=[]}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        municipality_id: '',
        barangay_id: '',
        latitude: '',
        longitude: '',
        crops: [],
    });

    const [step, setStep] = useState(1);

    const prevStep = () => {
        setStep(step - 1);
    }
    const nextStep = () => {
        setStep(step + 1);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    }

    const isStep1Valid =
        data.name &&
        data.email &&
        data.password &&
        data.password_confirmation &&
        data.phone_number

    const isStep2Valid =
        data.municipality_id &&
        data.barangay_id &&
        data.latitude &&
        data.longitude

    console.log(data.name);

    return (
        <Layout>
            <form onSubmit={submit} className=" p-6 md:p-8">
                <FieldGroup className="flex min-h-full flex-col gap-4">
                    {/* STEP 1 : Personal Information */}
                    {step === 1 && (
                        <Personal data={data} setData={setData} errors={errors}/>

                    )}

                    {/* STEP 2 : Address & Location */}
                    {step === 2 && (
                        <Location data={data} setData={setData} errors={errors} municipalities={municipalities}/>
                    )}

                    {/* STEP 3 : Crop Planted this Month */}
                    {step === 3 && (
                        <CropSelection data={data} setData={setData} errors={errors} categories={categories} crops={crops}/>
                    )}

                    <Field className="flex-0 grid grid-cols-3 gap-4">
                        {step > 1 && (<>
                            <Button onClick={prevStep} variant="outline" className="col-span-1"
                                disabled={processing}
                            >
                                <><ArrowLeft/>{'Back'}</>
                            </Button>
                        </>)}
                        {step < 3 ? (<>
                            <Button onClick={nextStep} type="button" className="col-span-3 col-start-2"
                                disabled={processing || (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                            >
                                {processing
                                ? <Spinner/>
                                : (<>{'Next'}<ArrowRight/></>)}
                            </Button>
                        </>) : (<>
                            <Button type="submit" disabled={processing} className="col-span-3 col-start-2">
                                {processing
                                ? <Spinner/>
                                : (<>{'Next'}<CircleCheck/></>)}
                            </Button>
                        </>)}
                    </Field>
                </FieldGroup>
            </form>
        </Layout>
    )
}
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Hrvst" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                                </svg>
                                <span className="text-2xl font-bold text-gray-800">Hrvst</span>
                            </div>

                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('farmers.index')}
                                            className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium"
                                        >
                                            Farmers
                                        </Link>
                                        <Link
                                            href={route('crops.index')}
                                            className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium"
                                        >
                                            Crops
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Welcome to <span className="text-green-600">Hrvst</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Connecting farmers and traders in Benguet Province through a centralized crop pricing platform
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href={route('farmers.index')}
                                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-lg"
                            >
                                View Farmers
                            </Link>
                            <Link
                                href={route('crops.index')}
                                className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors font-medium text-lg"
                            >
                                View Crops
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Find Farmers</h3>
                            <p className="text-gray-600">
                                Locate farmers across Benguet with our interactive map
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">View Prices</h3>
                            <p className="text-gray-600">
                                Access up-to-date crop pricing information
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Connect</h3>
                            <p className="text-gray-600">
                                Bridge the gap between farmers and traders
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
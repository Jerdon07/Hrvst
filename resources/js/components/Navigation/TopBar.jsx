import { Link, usePage } from '@inertiajs/react';

export default function TopBar({ onMobileMenuToggle }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="max-w-full px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Left - Logo */}
                    <div className="flex items-center">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={onMobileMenuToggle}
                            className="md:hidden mr-3 text-gray-600 hover:text-green-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <Link href="/" className="flex items-center space-x-2">
                            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                            </svg>
                            <span className="text-2xl font-bold text-gray-900">Hrvst</span>
                        </Link>
                    </div>

                    {/* Center - Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link
                            href={route('farmers.index')}
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors text-base"
                        >
                            Farmers
                        </Link>
                        <Link
                            href={route('crops.index')}
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors text-base"
                        >
                            Crops
                        </Link>
                    </div>

                    {/* Right - Auth Buttons */}
                    <div className="flex items-center space-x-3">
                        {user ? (
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                                Sign out
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-5 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
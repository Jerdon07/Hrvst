import { Button } from "../../Components/ui/button";

export default function HomeNav ({ auth }) {
    return (
        <nav className="bg-white border-b-2 border-black font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <img 
                            src="/assets/hrvst.svg" 
                            alt="Hrvst" 
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-2xl font-bold text-gray-800">Hrvst</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Button variant="secondary" href={route('logout')} method="post">
                                Sign out
                            </Button>
                        ) : (
                            <>
                                <Button variant='secondary' href={route('login')}>
                                    Log in
                                </Button>
                                <Button variant='primary' href={route('register')}>
                                    Sign up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
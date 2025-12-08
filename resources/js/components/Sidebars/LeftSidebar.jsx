export default function LeftSidebar({ isOpen, onClose, children, title }) {
    return (
        <>
            <div
                className={`
                    flex flex-none shrink-0 w-64 m-4 rounded-lg bg-white shadow-lg z-40 border p-3
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    overflow-y-auto pointer-events-auto
                `}
            >

                    {/* Content */}
                    {children}
            </div>
        </>
    );
}

import { usePage } from "@inertiajs/react";
import AddressFilterPanel from "./AddressFilterPanel";
import CategoryFilterPanel from "./CategoryFilterPanel";

export default function LeftSidebar() {
    const page = usePage().url.split('?')[0];

    return (
        <div
            className="
                flex flex-none shrink-0 w-64 m-4 rounded-lg bg-white shadow-lg
                z-40 border p-3 transition-transform duration-300 ease-in-out
                translate-x-0 overflow-y-auto pointer-events-auto
            "
        >
            {/* Content */}
            {page === '/farmers' && (
                <AddressFilterPanel />
            )}

            {page === '/crops' && (
                <CategoryFilterPanel />
            )}
        </div>
    );
}

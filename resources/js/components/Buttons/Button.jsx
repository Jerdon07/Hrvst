import { Link } from "@inertiajs/react";

export default function Button({ href = null, method = null, children, ...props }) {
    if (href) {
        return (
            <Link
                href={href}
                method={method}
                as="button"
                {...props}
            >
                {children}
            </Link>
        );
    }
    
    return (
        <button {...props}>
            {children}
        </button>
    )
}
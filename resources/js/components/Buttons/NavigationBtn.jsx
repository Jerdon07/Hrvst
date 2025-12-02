import Button from "./Button"

export default function NavigationBtn({ href, children }) {
    return (
        <Button
            href={href}
            className="text-gray-700 hover:text-green-600 font-medium transition-colors"
        >
            {children}
        </Button>
    )
}
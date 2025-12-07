export default function IconButton({ 
    variant = 'ghost',
    size = 'md',
    icon: Icon,
    label,
    onClick,
    className = '',
    ...props 
}) {
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
    };

    const variantClasses = {
        ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
        danger: 'text-red-600 hover:text-red-700 hover:bg-red-50',
        primary: 'text-green-600 hover:text-green-700 hover:bg-green-50',
    };

    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center justify-center rounded-full transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            aria-label={label}
            title={label}
            {...props}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
}
import { IInputProps } from 'utils/interfaces';
import { cn } from 'utils/lib/utils';
import { forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({ className, label, error, type = 'text', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                )}
                <input
                    type={type}
                    className={cn(
                        'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200',
                        error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';


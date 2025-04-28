// local imports
import type React from 'react';
import { IButtonProps } from 'utils/interfaces';

export const Button = ({
    onClick,
    className = '',
    label,
    children,
    type = 'default',
    isDisable = false
}: IButtonProps) => {
    const baseClasses =
        'flex items-center gap-2.5 font-medium text-center whitespace-nowrap align-middle select-none border border-transparent py-1.5 px-3 text-base leading-6 rounded transition-all duration-150 cursor-pointer';

    const typeClasses = {
        default: 'bg-white text-black border-black hover:bg-gray-100',
        primary:
            'px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition duration-300',
        secondary: 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-800',
        success:
            'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-800',
        danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-800',
        warning:
            'bg-yellow-400 text-gray-800 border-yellow-400 hover:bg-yellow-300 hover:border-yellow-300',
        info: 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-500 hover:border-cyan-400',
        light: 'bg-gray-100 text-gray-800 border-gray-100 hover:bg-gray-200 hover:border-gray-300',
        dark: 'bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900',
        link: 'bg-transparent text-gray-600 hover:text-blue-700 transition duration-300'
    };

    const buttonType = isDisable ? 'default' : type;
    const disabledClasses = isDisable ? 'opacity-75 cursor-not-allowed' : '';

    return (
        <button
            type="button"
            className={`${baseClasses} ${typeClasses[buttonType]} ${disabledClasses} ${className}`}
            onClick={onClick}
            disabled={isDisable}
        >
            {children || label}
        </button>
    );
};

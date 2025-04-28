import React from 'react';
import { ILinkProps } from 'utils/interfaces';

export const Link = ({ href, children, className = '', target, rel }: ILinkProps) => {
    const baseClasses =
        'text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out';

    // Combine base classes with any custom classes provided
    const combinedClasses = `${baseClasses} ${className}`.trim();

    return (
        <a
            href={href}
            className={combinedClasses}
            target={target}
            rel={rel} // Important for security when using target="_blank"
        >
            {children}
        </a>
    );
};

import { ChangeEvent, Dispatch, SetStateAction, type InputHTMLAttributes } from 'react';
import { category, flashCard } from 'utils/types';

export interface ITypographyProps {
    label: string;
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
    className?: string;
}

export interface ITypography {
    [key: string]: string | any;
}

export interface IButtonProps {
    onClick?: () => void;
    label: string;
    children?: React.ReactNode;
    isLoading?: boolean;
    className?: string;
    isDisable?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    type?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'light'
        | 'dark'
        | 'link'
        | 'submit'
        | 'default';
}

export interface INavBarProps {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export interface ICheckBox {
    value: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export interface ITextAreaProps {
    placeHolder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

export interface IFlashCardSetProps {
    item: category;
    onClick: () => void;
}

export interface IFlashCardProps {
    item: flashCard;
    onClick: () => void;
}

export interface IErrorProps {
    label: string;
}

export interface IReviewComponentProps {
    setId: string | undefined;
    handleModalClose: () => void;
}

export interface JwtPayload {
    id: string;
    email: string;
    role: number;
    iat: number;
    exp: number;
}

export interface ILinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
}

export interface ILoginFormProps {
    onSubmit?: (email: string, password: string) => void;
    isLoading?: boolean;
}

export interface IRegisterFormProps {
    onSubmit?: (
        name: string,
        email: string,
        password: string,
        additionalData: {
            contactNumber: string;
            specialization?: string;
            qualification?: string;
            experience?: number;
            dateOfBirth?: string;
            gender?: string;
            address?: {
                street: string;
                city: string;
                state: string;
                zipCode: string;
                country: string;
            };
        }
    ) => void;
    isLoading?: boolean;
    userType?: 'doctor' | 'patient';
}

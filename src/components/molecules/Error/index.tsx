import { Typography } from 'components/atoms/Typography';
import { IErrorProps } from 'utils/interfaces';

export const FlashError = ({ label }: IErrorProps) => {
    return (
        <div className="error-wrapper">
            <Typography variant="h6" label={label} className="pl-1 text-red-500" />
        </div>
    );
};

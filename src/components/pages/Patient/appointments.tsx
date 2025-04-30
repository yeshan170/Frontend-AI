import { Typography } from '@/components/atoms/Typography';
import { AppointmentList } from '@/components/organisms/AppointmentList';

export const Appointments = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Typography variant="h2" label="My Appointments" />
            </div>

            <AppointmentList />
        </div>
    );
};

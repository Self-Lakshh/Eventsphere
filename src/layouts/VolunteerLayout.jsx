import { Outlet } from 'react-router-dom';

const VolunteerLayout = () => (
    <div>
        <header>Volunteer Header</header>
        <main>
            <Outlet />
        </main>
    </div>
);

export default VolunteerLayout;

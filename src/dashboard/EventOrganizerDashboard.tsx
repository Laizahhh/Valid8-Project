import { NavbarEventOrganizer } from "../components/NavbarEventOrganizer";
import Welcome from "../pages/Welcome";
const EventOrganizerDashboard = () => {
  return (
    <div className="event-organizer-dashboard">
      <NavbarEventOrganizer />
      <Welcome />
    </div>
  );
};

export default EventOrganizerDashboard;

import { r as registerInstance, e as createEvent, h } from './index-0ae3ea8a.js';

const appRootCss = ":host{display:block;font-family:'Arial', sans-serif;max-width:1200px;margin:0 auto;padding:20px;background-color:#f4f4f4}h1{text-align:center;color:#333;margin-bottom:30px;font-size:2.5rem;border-bottom:3px solid #007bff;padding-bottom:10px}nav{display:flex;justify-content:center;margin-bottom:30px;gap:20px}nav button{padding:10px 20px;background-color:#007bff;color:white;border:none;border-radius:5px;cursor:pointer;transition:background-color 0.3s ease}nav button:hover{background-color:#0056b3}";

const AppRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.addNewVenue = createEvent(this, "addNewVenue", 7);
        this.currentPage = 'booking';
        this.sports = [
            { id: 1, name: 'Badminton' },
            { id: 2, name: 'Cricket' },
            { id: 3, name: 'Tennis' },
            { id: 4, name: 'Basketball' },
            { id: 5, name: 'Swimming' },
            { id: 6, name: 'Football' }
        ];
        this.venues = [
            { id: 1, name: 'Adena', sportId: 1, pricePerHour: 200, location: 'Downtown', available: true },
            { id: 2, name: 'Eagle Court', sportId: 1, pricePerHour: 250, location: 'North District', available: true },
            { id: 3, name: 'Champions Badminton', sportId: 1, pricePerHour: 300, location: 'West End', available: true },
            { id: 4, name: 'Green Cricket Ground', sportId: 2, pricePerHour: 1000, location: 'East Park', available: true },
            { id: 5, name: 'Victory Cricket Academy', sportId: 2, pricePerHour: 1200, location: 'South Side', available: true },
            { id: 6, name: 'National Cricket Stadium', sportId: 2, pricePerHour: 1500, location: 'Central District', available: true },
            { id: 7, name: 'Ace Tennis Club', sportId: 3, pricePerHour: 400, location: 'Riverside', available: true },
            { id: 8, name: 'Grand Slam Courts', sportId: 3, pricePerHour: 450, location: 'Uptown', available: true },
            { id: 9, name: 'Royal Tennis Academy', sportId: 3, pricePerHour: 500, location: 'North Hill', available: true },
            { id: 10, name: 'Hoops Basketball Center', sportId: 4, pricePerHour: 350, location: 'Downtown', available: true },
            { id: 11, name: 'Slam Dunk Arena', sportId: 4, pricePerHour: 400, location: 'West District', available: true },
            { id: 12, name: 'City Basketball Court', sportId: 4, pricePerHour: 300, location: 'South Park', available: true },
            { id: 13, name: 'Aquatic Center', sportId: 5, pricePerHour: 150, location: 'East End', available: true },
            { id: 14, name: 'Olympic Swimming Pool', sportId: 5, pricePerHour: 200, location: 'Sports Complex', available: true },
            { id: 15, name: 'Blue Lagoon Club', sportId: 5, pricePerHour: 250, location: 'North District', available: true },
            { id: 16, name: 'Victory Football Ground', sportId: 6, pricePerHour: 800, location: 'West Park', available: true },
            { id: 17, name: 'United Soccer Field', sportId: 6, pricePerHour: 900, location: 'South End', available: true },
            { id: 18, name: 'Premier Football Stadium', sportId: 6, pricePerHour: 1000, location: 'East District', available: true }
        ];
        this.bookings = [];
    }
    componentWillLoad() {
        const storedBookings = localStorage.getItem('sportVenueBookings');
        if (storedBookings) {
            this.bookings = JSON.parse(storedBookings).map(booking => new Date(`${booking.date}T${booking.endTime}`) < new Date()
                ? Object.assign(Object.assign({}, booking), { status: 'completed' }) : booking);
        }
        const storedVenues = localStorage.getItem('sportVenues');
        if (storedVenues) {
            this.venues = JSON.parse(storedVenues);
        }
    }
    handleNewBooking(event) {
        this.bookings = [...this.bookings, event.detail];
        // .map(booking => 
        //   new Date(`${booking.date}T${booking.endTime}`) < new Date() 
        //     ? { ...booking, status: 'completed' } 
        //     : booking
        // );
        localStorage.setItem('sportVenueBookings', JSON.stringify(this.bookings));
    }
    handleCancelBooking(event) {
        this.bookings = this.bookings.map(booking => booking.id === event.detail ? Object.assign(Object.assign({}, booking), { status: 'cancelled' }) : booking);
        localStorage.setItem('sportVenueBookings', JSON.stringify(this.bookings));
    }
    toggleVenueStatus(event) {
        this.venues = this.venues.map(venue => venue.id === event.detail ? Object.assign(Object.assign({}, venue), { available: !venue.available }) : venue);
    }
    handleAddNewVenue(event) {
        this.venues = [...this.venues, event.detail];
        localStorage.setItem('sportVenues', JSON.stringify(this.venues));
    }
    render() {
        return (h("div", { key: 'e0c5f1619b0a689252c29e3e5416ec28aaff9efa' }, h("h1", { key: 'f475df4d524f7420deca492e73c3aa0f0eebf9df' }, "Sports Venue Booking System"), h("nav", { key: '9e3052ee543b0f956f72781e6ddd18875f926e1a' }, h("button", { key: '903d8b917e54f00e69fa76efed954841c3b739b3', onClick: () => (this.currentPage = 'booking') }, "Book Venue"), h("button", { key: 'cae057fdbc51967ec97c5b9fa9a2f7f0c1d944ed', onClick: () => (this.currentPage = 'management') }, "Manage Venues"), h("button", { key: '76e3310af8a77833ac85f41f46bb92f38564b0e0', onClick: () => (this.currentPage = 'history') }, "Booking History")), this.currentPage === 'booking' && (h("app-booking", { key: 'cf6532c5b3471d9f9b5ff4449782b3f6e6df211f', sports: this.sports, venues: this.venues, bookings: this.bookings, onNewBooking: event => this.handleNewBooking(event) })), this.currentPage === 'management' && (h("app-management", { key: '3852eab99b634ad8d8dc5496610e9c5229a7b18d', sports: this.sports, venues: this.venues, onToggleVenueStatus: event => this.toggleVenueStatus(event), onAddNewVenue: event => this.handleAddNewVenue(event) })), this.currentPage === 'history' && (h("app-history", { key: '0be7be1934bd5056c542469225088a53e9e0eca0', sports: this.sports, venues: this.venues, bookings: this.bookings, onCancelBooking: event => this.handleCancelBooking(event) }))));
    }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };

//# sourceMappingURL=app-root.entry.js.map
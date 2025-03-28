import { r as registerInstance, e as createEvent, h } from './index-0ae3ea8a.js';

const appHistoryCss = ":host{display:block;background-color:white;padding:30px;border-radius:10px;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1)}h2{text-align:center;color:#333;margin-bottom:20px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:12px;text-align:left}th{background-color:#f2f2f2;font-weight:bold}tr:nth-child(even){background-color:#f9f9f9}button{padding:8px 15px;background-color:#dc3545;color:white;border:none;border-radius:4px;cursor:pointer;transition:background-color 0.3s ease}button:hover{background-color:#c82333}p{text-align:center;color:#666;font-style:italic}";

const AppHistory = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.cancelBooking = createEvent(this, "cancelBooking", 7);
        this.bookings = [];
        this.venues = [];
        this.sports = [];
    }
    getVenueDetails(venueId) {
        return this.venues.find(v => v.id === venueId);
    }
    getSportName(sportId) {
        var _a;
        return ((_a = this.sports.find(s => s.id === sportId)) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown';
    }
    render() {
        return (h("div", { key: 'c9e55a8a971cf123a003ecca1354a22f99c93a22' }, h("h2", { key: 'a191cda75966f4469e7f4ce4c61098129348ea9f' }, "Booking History"), this.bookings.length === 0 ? h("p", null, "No bookings yet.") : (h("table", null, h("thead", null, h("tr", null, h("th", null, "Venue"), h("th", null, "Sport"), h("th", null, "Date"), h("th", null, "Time"), h("th", null, "Customer"), h("th", null, "Price"), h("th", null, "Phone"), h("th", null, "Status"), h("th", null, "Actions"))), h("tbody", null, this.bookings.map(booking => {
            const venue = this.getVenueDetails(booking.venueId);
            return (h("tr", null, h("td", null, venue.name), h("td", null, this.getSportName(venue.sportId)), h("td", null, booking.date), h("td", null, booking.startTime, " - ", booking.endTime), h("td", null, booking.customerName), h("td", null, "Rs.", booking.totalPrice), h("td", null, booking.customerPhone), h("td", null, booking.status), h("td", null, booking.status === 'active' && (h("button", { onClick: () => this.cancelBooking.emit(booking.id) }, "Cancel")))));
        }))))));
    }
};
AppHistory.style = appHistoryCss;

export { AppHistory as app_history };

//# sourceMappingURL=app-history.entry.js.map
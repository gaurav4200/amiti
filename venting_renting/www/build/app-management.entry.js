import { r as registerInstance, e as createEvent, h } from './index-0ae3ea8a.js';

const appManagementCss = ":host{display:block;background-color:white;padding:30px;border-radius:10px;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1)}h2{text-align:center;color:#333;margin-bottom:20px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:12px;text-align:left}th{background-color:#f2f2f2;font-weight:bold}tr:nth-child(even){background-color:#f9f9f9}button{padding:8px 15px;background-color:#17a2b8;color:white;border:none;border-radius:4px;cursor:pointer;transition:background-color 0.3s ease}button:hover{background-color:#138496}.add-venue-form{background-color:#f9f9f9;border:1px solid #ddd;border-radius:8px;padding:20px;margin-bottom:20px}.add-venue-form h3{text-align:center;color:#333;margin-bottom:15px}.add-venue-form input,.add-venue-form select{width:100%;padding:10px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;box-sizing:border-box}.add-venue-form button{width:100%;padding:10px;background-color:#28a745;color:white;border:none;border-radius:4px;cursor:pointer;transition:background-color 0.3s ease;margin-bottom:15px}tr.unavailable{background-color:#ffdddd;color:#666}tr.unavailable button{background-color:#dc3545}";

const AppManagement = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.toggleVenueStatus = createEvent(this, "toggleVenueStatus", 7);
        this.addNewVenue = createEvent(this, "addNewVenue", 7);
        this.venues = [];
        this.sports = [];
        this.newVenueName = '';
        this.newVenueLocation = '';
        this.newVenueSportId = null;
        this.newVenuePricePerHour = 0;
    }
    getSportName(sportId) {
        var _a;
        return ((_a = this.sports.find(sport => sport.id === sportId)) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown';
    }
    handleAddVenue() {
        if (!this.newVenueName || !this.newVenueLocation || !this.newVenueSportId || !this.newVenuePricePerHour) {
            alert('Please fill in all fields');
            return;
        }
        const newVenue = {
            id: Date.now(),
            name: this.newVenueName,
            sportId: this.newVenueSportId,
            pricePerHour: this.newVenuePricePerHour,
            location: this.newVenueLocation,
            available: true
        };
        this.addNewVenue.emit(newVenue);
        this.newVenueName = '';
        this.newVenueLocation = '';
        this.newVenueSportId = null;
        this.newVenuePricePerHour = 0;
    }
    render() {
        return (h("div", { key: '2d81af260351c24a0fc86c571eb5e968b7d26bf8', class: "add-venue-form" }, h("h2", { key: '751e16c918f61f16d2fef175fcb713eb486107e7' }, "Venue Management"), h("div", { key: '4b46a44150b10eaa22f556465caed2820cb80a6a' }, h("h3", { key: '68b6c95ada6a9aedba58690edd0e5f3c11c98bb5' }, "Add New Venue"), h("input", { key: '3e220f10b3f26246c836d283b2ab3940449ba6b9', type: "text", placeholder: "Venue Name", value: this.newVenueName, onInput: (e) => this.newVenueName = e.target.value }), h("select", { key: 'b42f27ccc6337e51c40879060c7be0230372b7b5', onChange: (e) => this.newVenueSportId = parseInt(e.target.value) }, h("option", { key: 'e5993532d0878d0df48781fb02326f966599559e', value: "" }, "Select Sport"), this.sports.map(sport => (h("option", { key: sport.id, value: sport.id }, sport.name)))), h("input", { key: 'd2c29c9a06d3684b122965feefdf886ef2f182c8', type: "number", placeholder: "Price per Hour", value: this.newVenuePricePerHour, onInput: (e) => this.newVenuePricePerHour = parseInt(e.target.value) }), h("input", { key: 'a7a757136bd2a01d6bf8d9b5395bb38385346783', type: "text", placeholder: "Location", value: this.newVenueLocation, onInput: (e) => this.newVenueLocation = e.target.value }), h("button", { key: '7f079b37482f8c135d5397006ceb82f24481403b', onClick: () => this.handleAddVenue() }, "Add Venue")), h("table", { key: '0fe5f157c48471f6d288c02582e86add30ba8c74' }, h("thead", { key: 'f390fceb7bc1464da993f8016fd76eb5080ecb0f' }, h("tr", { key: '934f579b03a6263fa7412c20964bfcbab4fb4ecd' }, h("th", { key: '99e855d0e14e5fceb3da0385c8b64fae1fe2d1ed' }, "Venue"), h("th", { key: '8191d6fca65124ef024f6aea74b6bbcf88d50bd9' }, "Sport"), h("th", { key: '68823e4181b80afefddf5c6d0538917dea2c6113' }, "Price"), h("th", { key: 'f9d6f305be4357b9e677cdd002434b48e52fbfee' }, "Status"), h("th", { key: '51d1a0979283311e64590946c977916f2f46cf93' }, "Actions"))), h("tbody", { key: '9b93a933e8104ca6d41dae273f8ff03987833ef5' }, this.venues.map(venue => (h("tr", { class: venue.available ? 'available' : 'unavailable' }, h("td", null, venue.name), h("td", null, this.getSportName(venue.sportId)), h("td", null, "Rs.", venue.pricePerHour), h("td", null, venue.available ? 'Available' : 'Unavailable'), h("td", null, h("button", { onClick: () => this.toggleVenueStatus.emit(venue.id) }, venue.available ? 'Mark Unavailable' : 'Mark Available')))))))));
    }
};
AppManagement.style = appManagementCss;

export { AppManagement as app_management };

//# sourceMappingURL=app-management.entry.js.map
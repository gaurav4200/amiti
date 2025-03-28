import { r as registerInstance, e as createEvent, h } from './index-0ae3ea8a.js';

const appBookingCss = ":host{display:block;background-color:white;padding:30px;border-radius:10px;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1)}h2{text-align:center;color:#333;margin-bottom:20px}select,input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ddd;border-radius:5px;box-sizing:border-box}button{width:100%;padding:12px;background-color:#28a745;color:white;border:none;border-radius:5px;cursor:pointer;transition:background-color 0.3s ease}button:hover{background-color:#218838}p{color:red;text-align:center;margin-top:10px}ul{list-style-type:none;padding:0;margin-top:10px}ul li{background-color:#f8d7da;color:#721c24;padding:8px;margin-bottom:5px;border-radius:4px}h3{margin-top:20px;color:#333}";

const AppBooking = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.newBooking = createEvent(this, "newBooking", 7);
        this.sports = [];
        this.venues = [];
        this.bookings = [];
        this.selectedSportId = null;
        this.selectedVenueId = null;
        this.selectedDate = '';
        this.startTime = '';
        this.endTime = '';
        this.customerName = '';
        this.customerPhone = '';
        this.bookingConflictError = '';
        this.phoneError = '';
    }
    validatePhoneNumber(phone) {
        const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }
    isTimeSlotAvailable() {
        return !this.bookings.some(booking => booking.venueId === this.selectedVenueId &&
            booking.date === this.selectedDate &&
            ((this.startTime >= booking.startTime && this.startTime < booking.endTime) ||
                (this.endTime > booking.startTime && this.endTime <= booking.endTime)));
    }
    calculateTotalPrice() {
        const venue = this.venues.find(v => v.id === this.selectedVenueId);
        if (!venue)
            return 0;
        const start = new Date(`1970-01-01T${this.startTime}`);
        const end = new Date(`1970-01-01T${this.endTime}`);
        let hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        const extra = hours % 1;
        if (extra >= 0.01 && extra <= 0.50) {
            hours = Math.floor(hours) + 0.5;
        }
        else {
            hours = Math.ceil(hours);
        }
        return venue.pricePerHour * hours;
    }
    handleBooking() {
        var _a;
        this.phoneError = '';
        this.bookingConflictError = '';
        if (!this.validatePhoneNumber(this.customerPhone)) {
            this.phoneError = 'Please enter a valid 10-digit Indian mobile number';
            return;
        }
        const startHour = parseInt(this.startTime.split(':')[0], 10);
        const endHour = parseInt(this.endTime.split(':')[0], 10);
        if (startHour < 6 || endHour < 6) {
            this.bookingConflictError = 'Booking is not allowed between 12:00 AM and 6:00 AM';
            return;
        }
        if (this.isTimeSlotAvailable()) {
            const newBooking = {
                id: Date.now(),
                venueId: this.selectedVenueId,
                date: this.selectedDate,
                startTime: this.startTime,
                endTime: this.endTime,
                customerName: this.customerName,
                customerPhone: this.customerPhone,
                totalPrice: this.calculateTotalPrice(),
                status: 'active'
            };
            alert(`Booking Successful!
      
  Venue: ${(_a = this.venues.find(v => v.id === this.selectedVenueId)) === null || _a === void 0 ? void 0 : _a.name}
  Date: ${this.selectedDate}
  Time: ${this.startTime} - ${this.endTime}
  Total Price: Rs.${newBooking.totalPrice}`);
            this.newBooking.emit(newBooking);
            this.selectedSportId = null;
            this.selectedVenueId = null;
            this.selectedDate = '';
            this.startTime = '';
            this.endTime = '';
            this.customerName = '';
            this.customerPhone = '';
            this.phoneError = '';
            this.bookingConflictError = '';
        }
        else {
            this.bookingConflictError = 'This time slot is already booked';
        }
    }
    getBookedSlotsForVenue() {
        return this.bookings
            .filter(booking => booking.venueId === this.selectedVenueId &&
            booking.status === 'active' &&
            booking.date === this.selectedDate)
            .map(booking => ({
            startTime: booking.startTime,
            endTime: booking.endTime
        }));
    }
    render() {
        const filteredVenues = this.venues.filter(venue => venue.sportId === this.selectedSportId && venue.available);
        const today = new Date().toISOString().split('T')[0];
        return (h("div", { key: '92d3eaadcc42a93bff1fadc445730523bf97fefd' }, h("h2", { key: '89518b8dcc19a6a88863235aa1112d8ae74bbf25' }, "Book a Venue"), h("select", { key: '34aa7300a30593378e79dacb9f649ff7311102b9', onChange: e => this.selectedSportId = parseInt(e.target.value) }, h("option", { key: '084848bc23b96dc328d6c7777fae8fc9b8885c16', value: "" }, "-- Select Sport --"), this.sports.map(sport => h("option", { value: sport.id }, sport.name))), this.selectedSportId && (h("select", { key: 'f02bbc71b01e81e58f6942a357383a24178ed40f', onChange: e => this.selectedVenueId = parseInt(e.target.value) }, h("option", { key: '391e06a02d4c8665ad6cd1da985c49de29be0cd7', value: "" }, "-- Select Venue --"), filteredVenues.map(venue => h("option", { value: venue.id }, venue.name)))), this.selectedVenueId && (h("div", { key: '7394ee9b5ca387b94233bd6c20f73a514b180b8c' }, h("input", { key: '6a0a95924474a5569cbe3f194591e740293e3846', type: "date", onInput: e => this.selectedDate = e.target.value, min: today }), h("input", { key: 'ae02f58f1bacf3cd4dd1c7361360c25daa0c5201', type: "time", onInput: e => this.startTime = e.target.value }), h("input", { key: '431ed870eb74c48b720d4fc8bd261913b2862b98', type: "time", onInput: e => this.endTime = e.target.value }), h("input", { key: 'e1f3d721ea34608d533ba8bf2842a2575de1713e', type: "text", placeholder: "Name", onInput: e => this.customerName = e.target.value }), h("input", { key: '5883d538a639d8a65c96e2bcad719a5d0376da50', type: "tel", placeholder: "Phone", onInput: e => this.customerPhone = e.target.value }), h("button", { key: '68173aa862e02408c73aa98466f1f2254266843b', onClick: () => this.handleBooking() }, "Book Now"), this.phoneError && h("p", { key: 'd818e042745dc3dc02b6b9c7f7d302bbb10faf3b', style: { color: 'red' } }, this.phoneError), this.bookingConflictError && h("p", { key: 'c0b26fe9bd85e48c3b8db06018a48c52dad99f3f', style: { color: 'red' } }, this.bookingConflictError))), this.selectedVenueId && this.selectedDate && (h("div", { key: '2d2b201a54b10932d6dd44de5167ff4dc074173c' }, h("h3", { key: '110b96737f87ebb0e9c7764e6d955edc824aa4fd' }, "Already Booked Slots"), this.getBookedSlotsForVenue().length > 0 ? (h("ul", null, this.getBookedSlotsForVenue().map(slot => (h("li", null, slot.startTime, " - ", slot.endTime))))) : (h("p", null, "No slots booked for this venue on this date."))))));
    }
};
AppBooking.style = appBookingCss;

export { AppBooking as app_booking };

//# sourceMappingURL=app-booking.entry.js.map
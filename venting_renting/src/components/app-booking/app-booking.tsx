import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'app-booking',
  styleUrl: 'app-booking.css',
  shadow: true
})
export class AppBooking {
  @Prop() sports: any[] = [];
  @Prop() venues: any[] = [];
  @Prop() bookings: any[] = [];

  @Event() newBooking: EventEmitter;

  @State() selectedSportId: number = null;
  @State() selectedVenueId: number = null;
  @State() selectedDate: string = '';
  @State() startTime: string = '';
  @State() endTime: string = '';
  @State() customerName: string = '';
  @State() customerPhone: string = '';
  @State() bookingConflictError: string = '';
  @State() phoneError: string = '';

  validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));

  }
  isTimeSlotAvailable(): boolean {
    return !this.bookings.some(booking =>
      booking.venueId === this.selectedVenueId &&
      booking.date === this.selectedDate &&
      ((this.startTime >= booking.startTime && this.startTime < booking.endTime) ||
        (this.endTime > booking.startTime && this.endTime <= booking.endTime))
    );
  }

  calculateTotalPrice(): number {
    const venue = this.venues.find(v => v.id === this.selectedVenueId);
    if (!venue) return 0;
    const start = new Date(`1970-01-01T${this.startTime}`);
    const end = new Date(`1970-01-01T${this.endTime}`);
    let hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const extra=hours%1
    if(extra>=0.01 && extra<=0.50){
        hours= Math.floor(hours)+0.5
    }else{
        hours=Math.ceil(hours)
    }
    return venue.pricePerHour * hours;

  }


  handleBooking() {
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
      
  Venue: ${this.venues.find(v => v.id === this.selectedVenueId)?.name}
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
    } else {
      this.bookingConflictError = 'This time slot is already booked';
    }
  }

  
  getBookedSlotsForVenue() {
    return this.bookings
      .filter(booking => 
        booking.venueId === this.selectedVenueId && 
        booking.status === 'active' &&
        booking.date === this.selectedDate
      )
      .map(booking => ({
        startTime: booking.startTime,
        endTime: booking.endTime
      }));
  }

  render() {
    const filteredVenues = this.venues.filter(venue => 
  venue.sportId === this.selectedSportId && venue.available
);
const today = new Date().toISOString().split('T')[0];

    return (
      <div>
        <h2>Book a Venue</h2>
        
        <select onChange={e => this.selectedSportId = parseInt((e.target as HTMLSelectElement).value)}>
          <option value="">-- Select Sport --</option>
          {this.sports.map(sport => <option value={sport.id}>{sport.name}</option>)}
        </select>

        {this.selectedSportId && (
          <select onChange={e => this.selectedVenueId = parseInt((e.target as HTMLSelectElement).value)}>
            <option value="">-- Select Venue --</option>
            {filteredVenues.map(venue => <option value={venue.id}>{venue.name}</option>)}
          </select>
        )}

        {this.selectedVenueId && (
          <div>
            <input type="date" 
                onInput={e => this.selectedDate = (e.target as HTMLInputElement).value} min={today}/>

            <input type="time" 
                onInput={e => this.startTime = (e.target as HTMLInputElement).value} />

            <input type="time" 
                onInput={e => this.endTime = (e.target as HTMLInputElement).value} />

            <input type="text" placeholder="Name" 
                onInput={e => this.customerName = (e.target as HTMLInputElement).value} />
            
            <input 
              type="tel"  placeholder="Phone" 
              onInput={e => this.customerPhone = (e.target as HTMLInputElement).value} 
            />
            
            <button onClick={() => this.handleBooking()}>Book Now</button>

            {this.phoneError && <p style={{ color: 'red' }}>{this.phoneError}</p>}
            {this.bookingConflictError && <p style={{ color: 'red' }}>{this.bookingConflictError}</p>}
          </div>
        )}

        {this.selectedVenueId && this.selectedDate && (
          <div>
            <h3>Already Booked Slots</h3>
            {this.getBookedSlotsForVenue().length > 0 ? (
              <ul>
                {this.getBookedSlotsForVenue().map(slot => (
                  <li>
                    {slot.startTime} - {slot.endTime}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No slots booked for this venue on this date.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

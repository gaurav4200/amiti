import { Component, h, State ,Event, EventEmitter} from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @State() currentPage: string = 'booking'; 

  @State() sports = [
    { id: 1, name: 'Badminton' },
    { id: 2, name: 'Cricket' },
    { id: 3, name: 'Tennis' },
    { id: 4, name: 'Basketball' },
    { id: 5, name: 'Swimming' },
    { id: 6, name: 'Football' }
  ];

  @State() venues = [
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

  @State() bookings = [];
  componentWillLoad() {
    const storedBookings = localStorage.getItem('sportVenueBookings');
  if (storedBookings) {
    this.bookings = JSON.parse(storedBookings).map(booking => 
      new Date(`${booking.date}T${booking.endTime}`) < new Date() 
        ? { ...booking, status: 'completed' } 
        : booking
    );
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
    this.bookings = this.bookings.map(booking =>
      booking.id === event.detail ? { ...booking, status: 'cancelled' } : booking
    );
    localStorage.setItem('sportVenueBookings', JSON.stringify(this.bookings));
  }
  toggleVenueStatus(event) {
    this.venues = this.venues.map(venue =>
      venue.id === event.detail ? { ...venue, available: !venue.available } : venue
    );
  }
  @Event() addNewVenue: EventEmitter;

  handleAddNewVenue(event) {
    this.venues = [...this.venues, event.detail];
    localStorage.setItem('sportVenues', JSON.stringify(this.venues));
  }



  render() {
    return (
      <div>
        <h1>Sports Venue Booking System</h1>

        <nav>
          <button onClick={() => (this.currentPage = 'booking')}>Book Venue</button>
          <button onClick={() => (this.currentPage = 'management')}>Manage Venues</button>
          <button onClick={() => (this.currentPage = 'history')}>Booking History</button>
        </nav>

      
        {this.currentPage === 'booking' && (
          <app-booking
            sports={this.sports}
            venues={this.venues}
            bookings={this.bookings}
            onNewBooking={event => this.handleNewBooking(event)}
          ></app-booking>
        )}

      {this.currentPage === 'management' && (
        <app-management
          sports={this.sports}
          venues={this.venues}
          onToggleVenueStatus={event => this.toggleVenueStatus(event)}
          onAddNewVenue={event => this.handleAddNewVenue(event)}
        ></app-management>
      )}

        {this.currentPage === 'history' && (
          <app-history
            sports={this.sports}
            venues={this.venues}
            bookings={this.bookings}
            onCancelBooking={event => this.handleCancelBooking(event)}
          ></app-history>
        )}
      </div>
    );
  }
}

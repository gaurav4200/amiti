import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'app-history',
  styleUrl: 'app-history.css',
  shadow: true
})
export class AppHistory {
  @Prop() bookings: any[] = [];
  @Prop() venues: any[] = [];
  @Prop() sports: any[] = [];
  @Event() cancelBooking: EventEmitter;

  getVenueDetails(venueId: number) {
    return this.venues.find(v => v.id === venueId);
  }

  getSportName(sportId: number) {
    return this.sports.find(s => s.id === sportId)?.name || 'Unknown';
  }

  render() {
    return (
      <div>
        <h2>Booking History</h2>
        {this.bookings.length === 0 ? <p>No bookings yet.</p> : (
            
          <table>
            <thead>
              <tr>
                <th>Venue</th>
                <th>Sport</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.bookings.map(booking => {
                const venue = this.getVenueDetails(booking.venueId);
                return (
                  <tr>
                    <td>{venue.name}</td>
                    <td>{this.getSportName(venue.sportId)}</td>
                    <td>{booking.date}</td>
                    <td>{booking.startTime} - {booking.endTime}</td>
                    <td>{booking.customerName}</td>
                    <td>Rs.{booking.totalPrice}</td>
                    <td>{booking.customerPhone}</td>
                    <td>{booking.status}</td>
                    <td>
                      {booking.status === 'active' && (
                        <button onClick={() => this.cancelBooking.emit(booking.id)}>Cancel</button>
                      )}
                    </td>
                  </tr>

                );

              })}


            </tbody>
          </table>
        )}
      </div>

    );
  }
}

import { Component, h, Prop, Event, EventEmitter ,State, } from '@stencil/core';

@Component({
  tag: 'app-management',
  styleUrl: 'app-management.css',
  shadow: true
})
export class AppManagement {
  @Prop() venues: any[] = [];
  @Prop() sports: any[] = [];
  @Event() toggleVenueStatus: EventEmitter;

  getSportName(sportId: number) {
    return this.sports.find(sport => sport.id === sportId)?.name || 'Unknown';
  }

  @State() newVenueName: string = '';
@State() newVenueLocation: string = '';
@State() newVenueSportId: number = null;
@State() newVenuePricePerHour: number = 0;

@Event() addNewVenue: EventEmitter;

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
    return (
      <div class="add-venue-form">
        <h2>Venue Management</h2>

        <div>
  <h3>Add New Venue</h3>
  <input 
    type="text" 
    placeholder="Venue Name"
    value={this.newVenueName}
    onInput={(e) => this.newVenueName = (e.target as HTMLInputElement).value}
  />


  <select 
  onChange={(e) => this.newVenueSportId = parseInt((e.target as HTMLSelectElement).value)}
>
  <option value="">Select Sport</option>
  {this.sports.map(sport => (
    <option key={sport.id} value={sport.id}>{sport.name}</option>
  ))}
</select>
  <input 
    type="number" 
    placeholder="Price per Hour"
    value={this.newVenuePricePerHour}
    onInput={(e) => this.newVenuePricePerHour = parseInt((e.target as HTMLInputElement).value)}
  />
  <input 
    type="text" 
    placeholder="Location"
    value={this.newVenueLocation}
    onInput={(e) => this.newVenueLocation = (e.target as HTMLInputElement).value}
  />
  <button onClick={() => this.handleAddVenue()}>Add Venue</button>
</div>
        <table>
          <thead>
            <tr>
              <th>Venue</th>
              <th>Sport</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.venues.map(venue => (
              <tr class={venue.available ? 'available' : 'unavailable'}>
                <td>{venue.name}</td>
                <td>{this.getSportName(venue.sportId)}</td>
                <td>Rs.{venue.pricePerHour}</td>
                <td>{venue.available ? 'Available' : 'Unavailable'}</td>
                <td>
                  <button onClick={() => this.toggleVenueStatus.emit(venue.id)}>
                    {venue.available ? 'Mark Unavailable' : 'Mark Available'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

import React, { useContext, useEffect, useState } from 'react'
import '../styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const sampleFlights = [
  { id: 'FL001', origin: 'Bangalore', destination: 'Jaipur', departureTime: '2025-06-01T04:30', arrivalTime: '2025-06-01T06:30' },
  { id: 'FL002', origin: 'Varanasi', destination: 'Kolkata', departureTime: '2025-06-01T13:00', arrivalTime: '2025-06-01T15:00' },
  { id: 'FL003', origin: 'Pune', destination: 'Mumbai', departureTime: '2025-06-01T01:00', arrivalTime: '2025-06-01T03:30' },
  { id: 'FL004', origin: 'Jaipur', destination: 'Trivendrum', departureTime: '2025-06-01T10:00', arrivalTime: '2025-06-01T12:30' },
  { id: 'FL005', origin: 'Chennai', destination: 'Bhopal', departureTime: '2025-06-01T22:00', arrivalTime: '2025-06-02T01:00' },
  // ...add all your 50 flights here as objects (or load from your source)
];

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('userType') === 'admin'){
      navigate('/admin');
    } else if(localStorage.getItem('userType') === 'flight-operator'){
      navigate('/flight-admin');
    }
  }, []);

  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  const fetchFlights = () => {
    setError('');

    if (!departure) {
      setError('Please select departure city.');
      setFlights([]);
      return;
    }
    if (!destination) {
      setError('Please select destination city.');
      setFlights([]);
      return;
    }
    if (!departureDate) {
      setError('Please select journey date.');
      setFlights([]);
      return;
    }
    if (departure === destination) {
      setError('Departure and destination cannot be the same.');
      setFlights([]);
      return;
    }

    // Filter flights by departure city, destination city, and departure date (date only)
    const filtered = sampleFlights.filter(flight => {
      const flightDate = flight.departureTime.split('T')[0];
      return (
        flight.origin === departure &&
        flight.destination === destination &&
        flightDate === departureDate
      );
    });

    if (filtered.length === 0) {
      setError('No flights found for your search.');
      setFlights([]);
    } else {
      setFlights(filtered);
    }
  }

  const handleTicketBooking = (id, origin, dest) => {
    if (userId) {
      setTicketBookingDate(departureDate);
      navigate(`/book-flight/${id}`);
    } else {
      navigate('/auth');
    }
  }

  return (
    <div className="landingPage">
      <div className="landingHero">

        <div className="landingHero-title">
          <h1 className="banner-h1">Take Off on an Unforgettable Flight Booking Journey!</h1>
          <p className="banner-p">Fulfill your travel dreams with extraordinary flight bookings that take you to unforgettable destinations and ignite your spirit of adventure like never before.</p>     
        </div>

        <div className="Flight-search-container input-container mb-4">

          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => setCheckBox(e.target.checked)} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Return journey</label>
          </div>

          <div className='Flight-search-container-body'>

            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                aria-label="Departure city"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              >
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Varanasi">Varanasi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
              <label htmlFor="floatingSelect">Departure City</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                aria-label="Destination city"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Varanasi">Varanasi</option>
                <option value="Jaipur">Jaipur</option>
              </select>
              <label htmlFor="floatingSelect">Destination City</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="floatingInputstartDate"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              <label htmlFor="floatingInputstartDate">Journey date</label>
            </div>

            {checkBox &&
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInputreturnDate"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <label htmlFor="floatingInputreturnDate">Return date</label>
              </div>
            }

            <div>
              <button className="btn btn-primary" onClick={fetchFlights}>Search</button>
            </div>

          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        {flights.length > 0 &&
          <div className="availableFlightsContainer">
            <h1>Available Flights</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Flight ID</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Book</th>
                </tr>
              </thead>
              <tbody>
                {flights.map(flight => (
                  <tr key={flight.id}>
                    <td>{flight.id}</td>
                    <td>{flight.origin}</td>
                    <td>{flight.destination}</td>
                    <td>{new Date(flight.departureTime).toLocaleString()}</td>
                    <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleTicketBooking(flight.id, flight.origin, flight.destination)}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }

      </div>

      <section id="about" className="section-about p-4">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">
            &nbsp; &nbsp;&nbsp; &nbsp; Welcome to Flight Ticket management app, where we're committed to delivering a seamless travel experience from beginning to end...
          </p>
          {/* ... your other about paragraphs ... */}
          <span><h5>2024 SKY Furaito - &copy; All rights reserved</h5></span>
        </div>
      </section>
    </div>
  )
}

export default LandingPage;

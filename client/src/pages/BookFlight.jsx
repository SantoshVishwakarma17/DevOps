import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();

  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Redirect based on userType if logged in
    const userType = localStorage.getItem('userType');
    if (userType === 'admin') {
      navigate('/admin');
    } else if (userType === 'flight-operator') {
      navigate('/flight-admin');
    }
  }, [navigate]);

  const fetchFlights = () => {
    setError('');
    setFlights([]);

    if (!departure) {
      setError('Please select departure city.');
      return;
    }
    if (!destination) {
      setError('Please select destination city.');
      return;
    }
    if (!departureDate) {
      setError('Please select journey date.');
      return;
    }
    if (departure === destination) {
      setError('Departure and destination cannot be the same.');
      return;
    }

    // TODO: Replace this with actual backend API call or context data fetch.
    // Example placeholder to show where to fetch flights from backend:
    // fetch(`/api/flights?origin=${departure}&destination=${destination}&date=${departureDate}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.length === 0) {
    //       setError('No flights found for your search.');
    //     }
    //     setFlights(data);
    //   })
    //   .catch(() => setError('Failed to fetch flights.'));

    // Currently showing no flights (empty list)
    setError('No flights data available. Please connect to backend.');
  };

  const handleTicketBooking = (id) => {
    if (userId) {
      setTicketBookingDate(departureDate);
      navigate(`/book-flight/${id}`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="landingPage">
      <div className="landingHero">

        <div className="landingHero-title">
          <h1 className="banner-h1">Take Off on an Unforgettable Flight Booking Journey!</h1>
          <p className="banner-p">
            Fulfill your travel dreams with extraordinary flight bookings that take you to unforgettable destinations and ignite your spirit of adventure like never before.
          </p>     
        </div>

        <div className="Flight-search-container input-container mb-4">

          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={checkBox}
              onChange={(e) => setCheckBox(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Return journey</label>
          </div>

          <div className='Flight-search-container-body'>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                aria-label="Departure city"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              >
                <option value="" disabled>Select Departure City</option>
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
              <label>Departure City</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                aria-label="Destination city"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="" disabled>Select Destination City</option>
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
              <label>Destination City</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              <label>Journey Date</label>
            </div>

            {checkBox &&
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <label>Return Date</label>
              </div>
            }

            <div>
              <button className="btn btn-primary" onClick={fetchFlights}>Search</button>
            </div>

          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        {flights.length > 0 && (
          <div className="availableFlightsContainer mt-4">
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
                        onClick={() => handleTicketBooking(flight.id)}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      <section id="about" className="section-about p-4 mt-5">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">
            &nbsp;&nbsp;&nbsp;&nbsp;Welcome to Flight Ticket Management app, where we're committed to delivering a seamless travel experience from beginning to end...
          </p>
          <span><h5>2024 SKY Furaito - &copy; All rights reserved</h5></span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

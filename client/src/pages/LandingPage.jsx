import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if (null'userType') === 'admin') {
      navigate('/admin');
    } else if (null'userType') === 'flight-operator') {
      navigate('/flight-admin');
    }
  }, [navigate]);

  const [Flights, setFlights] = useState([]);

  const { setTicketBookingDate } = useContext(GeneralContext);
  // Removed duplicate userId declaration here

  // Fetch flights from backend filtered by departure and destination
  const fetchFlights = async () => {
    setError('');
    setFlights([]);

    if (!departure) {
      setError('Please select a departure city.');
      return;
    }
    if (!destination) {
      setError('Please select a destination city.');
      return;
    }
    if (!departureDate) {
      setError('Please select a journey date.');
      return;
    }
    if (departure === destination) {
      setError('Departure and destination cannot be the same.');
      return;
    }
    if (checkBox && !returnDate) {
      setError('Please select a return date for return journey.');
      return;
    }
    if (checkBox && new Date(returnDate) < new Date(departureDate)) {
      setError('Return date cannot be before departure date.');
      return;
    }

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      // Fetch all flights, then filter client-side (or implement filtering backend if available)
      const res = await axios.get(`${API_BASE_URL}/fetch-flights`);
      if (res.data && Array.isArray(res.data)) {
        // Filter flights matching departure and destination
        const filteredFlights = res.data.filter(
          (flight) =>
            flight.origin.toLowerCase() === departure.toLowerCase() &&
            flight.destination.toLowerCase() === destination.toLowerCase()
        );

        if (filteredFlights.length === 0) {
          setError('No flights found for the selected route.');
        }
        setFlights(filteredFlights);
      } else {
        setError('Error fetching flights.');
      }
    } catch (err) {
      setError('Error fetching flights. Please try again later.');
      console.error(err);
    }
  };

  const handleTicketBooking = (id, origin, dest) => {
    const userId = null'userId'); // get fresh userId

    if (userId) {
      if (origin.toLowerCase() === departure.toLowerCase()) {
        setTicketBookingDate(departureDate);
        navigate(`/book-flight/${id}`);
      } else if (dest.toLowerCase() === destination.toLowerCase()) {
        setTicketBookingDate(returnDate);
        navigate(`/book-flight/${id}`);
      }
    } else {
      navigate('/auth'); // redirect to login page if not logged in
    }
  };

  return (
    <div className="landingPage">
      <div className="landingHero">
        <div className="landingHero-title">
          <h1 className="banner-h1">
            Take Off on an Unforgettable Flight Booking Journey!
          </h1>
          <p className="banner-p">
            Fulfill your travel dreams with extraordinary flight bookings that
            take you to unforgettable destinations and ignite your spirit of
            adventure like never before.
          </p>
        </div>

        <div className="Flight-search-container input-container mb-4">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={checkBox}
              onChange={(e) => setCheckBox(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Return journey
            </label>
          </div>

          <div className="Flight-search-container-body">
            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                aria-label="Departure City"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
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
                aria-label="Destination City"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
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

            {checkBox && (
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
            )}

            <div>
              <button className="btn btn-primary" onClick={fetchFlights}>
                Search
              </button>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>

        {Flights.length > 0 && (
          <div className="availableFlightsContainer">
            <h1>Available Flights</h1>
            {Flights.map((flight) => (
              <div key={flight._id} className="flight-card">
                <p>
                  <b>Flight ID:</b> {flight.flightId}
                </p>
                <p>
                  <b>Flight Name:</b> {flight.flightName}
                </p>
                <p>
                  <b>From:</b> {flight.origin} | <b>To:</b> {flight.destination}
                </p>
                <p>
                  <b>Departure:</b> {flight.departureTime} | <b>Arrival:</b>{' '}
                  {flight.arrivalTime}
                </p>
                <p>
                  <b>Price:</b> ₹{flight.basePrice} | <b>Seats:</b> {flight.totalSeats}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleTicketBooking(flight._id, flight.origin, flight.destination)
                  }
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <section id="about" className="section-about p-4">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">
            &nbsp; &nbsp;&nbsp; &nbsp; Welcome to Flight Ticket management app,
            where we're committed to delivering a seamless travel experience from
            beginning to end. Whether you're heading out for a daily commute,
            planning an exciting cross-country trip, or looking for a peaceful
            scenic flight, our app offers a wide variety of options to match your
            travel needs.
          </p>
          <p className="section-description">
            &nbsp; &nbsp;&nbsp; &nbsp; We know how essential convenience and
            efficiency are when planning your journey. Our easy-to-use interface
            lets you quickly browse through available flight schedules, compare
            prices, and select the seating option that suits you best. In just a
            few simple steps, you can secure your flight and move closer to your
            destination. Our streamlined booking process allows you to personalize
            your travel, from choosing specific departure times to selecting a
            window seat or accommodating special requests.
          </p>
          <p className="section-description">
            &nbsp; &nbsp;&nbsp; &nbsp; With our app, you can look forward to
            discovering new places, taking in stunning views, and creating lasting
            memories. Begin your adventure today and let us help turn your travel
            dreams into reality. Enjoy the convenience, reliability, and comfort
            our app provides, and take off on unforgettable journeys with peace of
            mind.
          </p>

          <span>
            <h5>2024 SKY Furaito - &copy; All Rights Reserved.</h5>
          </span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

import React, { useContext, useEffect, useState } from 'react';
import '../styles/BookFlight.css';
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookFlight = () => {
  const { id } = useParams();

  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [startCity, setStartCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [startTime, setStartTime] = useState('');

  const { ticketBookingDate } = useContext(GeneralContext);

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [coachType, setCoachType] = useState('');
  const [journeyDate, setJourneyDate] = useState(ticketBookingDate || '');

  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const priceMultiplier = {
    economy: 1,
    'premium-economy': 2,
    business: 3,
    'first-class': 4,
  };

  const navigate = useNavigate();

  // Fetch flight data on mount and when id changes
  useEffect(() => {
    if (id) {
      fetchFlightData();
    }
  }, [id]);

  const fetchFlightData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-flight/${id}`);
      const data = response.data;
      setFlightName(data.flightName || '');
      setFlightId(data.flightId || '');
      setBasePrice(data.basePrice || 0);
      setStartCity(data.origin || '');
      setDestinationCity(data.destination || '');
      setStartTime(data.departureTime || '');
    } catch (error) {
      console.error('Failed to fetch flight data:', error);
      alert('Failed to load flight details. Please try again later.');
    }
  };

  // Sync passengerDetails array length with numberOfPassengers
  useEffect(() => {
    setPassengerDetails((prevDetails) => {
      const newDetails = [...prevDetails];
      while (newDetails.length < numberOfPassengers) {
        newDetails.push({ name: '', age: '' });
      }
      return newDetails.slice(0, numberOfPassengers);
    });
  }, [numberOfPassengers]);

  // Calculate total price whenever relevant values change
  useEffect(() => {
    if (priceMultiplier[coachType] && basePrice && numberOfPassengers > 0) {
      setTotalPrice(priceMultiplier[coachType] * basePrice * numberOfPassengers);
    } else {
      setTotalPrice(0);
    }
  }, [numberOfPassengers, coachType, basePrice]);

  // Handle passenger count change with max limit (optional)
  const handlePassengerChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 10) { // max 10 passengers limit
      setNumberOfPassengers(value);
    }
  };

  // Handle individual passenger detail changes
  const handlePassengerDetailsChange = (index, key, value) => {
    setPassengerDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = { ...updatedDetails[index], [key]: value };
      return updatedDetails;
    });
  };

  // Validate email format
  const validateEmail = (email) => {
    // simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate mobile number format (assuming 10-digit numeric)
  const validateMobile = (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  // Booking function with validation
  const bookFlight = async () => {
    if (!email || !mobile || !coachType || numberOfPassengers <= 0) {
      alert('Please fill all required fields (email, mobile, seat class, and passengers).');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validateMobile(mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    for (let i = 0; i < passengerDetails.length; i++) {
      const p = passengerDetails[i];
      if (!p.name.trim() || !p.age || isNaN(p.age) || p.age <= 0) {
        alert(`Please fill valid details for passenger ${i + 1} (name and positive age).`);
        return;
      }
    }

    const inputs = {
      user: localStorage.getItem('userId'),
      flight: id,
      flightName,
      flightId,
      departure: startCity,
      journeyTime: startTime,
      destination: destinationCity,
      email,
      mobile,
      passengers: passengerDetails,
      totalPrice,
      journeyDate,
      seatClass: coachType,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/book-ticket`, inputs);
      console.log('Booking response:', response.data);
      alert('Booking successful!');
      navigate('/bookings');
    } catch (error) {
      console.error('Booking error:', error.response || error.message);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="BookFlightPage">
      <div className="BookingFlightPageContainer">
        <h2>Book Ticket</h2>

        <section className="flight-summary">
          <p><b>Flight Name:</b> {flightName || 'Loading...'}</p>
          <p><b>Flight No:</b> {flightId || 'Loading...'}</p>
          <p><b>Base Price:</b> ₹{basePrice}</p>
          <p><b>From:</b> {startCity}</p>
          <p><b>To:</b> {destinationCity}</p>
          <p><b>Departure:</b> {startTime ? new Date(startTime).toLocaleString() : 'Loading...'}</p>
        </section>

        <section className="user-details">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInputemail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <label htmlFor="floatingInputemail">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="floatingInputmobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
              maxLength={10}
              pattern="\d{10}"
              required
            />
            <label htmlFor="floatingInputmobile">Mobile</label>
          </div>
        </section>

        <section className="booking-options">
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingInputnoPassengers"
              value={numberOfPassengers}
              onChange={handlePassengerChange}
              min="1"
              max="10"
              required
            />
            <label htmlFor="floatingInputnoPassengers">Number of Passengers</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="floatingInputjourneyDate"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              required
            />
            <label htmlFor="floatingInputjourneyDate">Journey Date</label>
          </div>

          <div className="form-floating">
            <select
              className="form-select form-select-sm mb-3"
              value={coachType}
              onChange={(e) => setCoachType(e.target.value)}
              aria-label="Seat Class"
              required
            >
              <option value="" disabled>
                Select Seat Class
              </option>
              <option value="economy">Economy Class</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business Class</option>
              <option value="first-class">First Class</option>
            </select>
            <label htmlFor="floatingSelect">Seat Class</label>
          </div>
        </section>

        <section className="passenger-details">
          {Array.from({ length: numberOfPassengers }).map((_, index) => (
            <div className="new-passenger" key={index}>
              <h4>Passenger {index + 1}</h4>
              <div className="new-passenger-inputs">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id={`floatingInputpassengerName${index}`}
                    value={passengerDetails[index]?.name || ''}
                    onChange={(event) => handlePassengerDetailsChange(index, 'name', event.target.value)}
                    placeholder="Name"
                    required
                  />
                  <label htmlFor={`floatingInputpassengerName${index}`}>Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id={`floatingInputpassengerAge${index}`}
                    value={passengerDetails[index]?.age || ''}
                    onChange={(event) => handlePassengerDetailsChange(index, 'age', event.target.value)}
                    placeholder="Age"
                    min="1"
                    required
                  />
                  <label htmlFor={`floatingInputpassengerAge${index}`}>Age</label>
                </div>
              </div>
            </div>
          ))}
        </section>

        <h6>
          <b>Total Price:</b> ₹{totalPrice}
        </h6>

        <button
          className="btn btn-primary"
          onClick={bookFlight}
          disabled={
            !email ||
            !mobile ||
            !coachType ||
            numberOfPassengers <= 0 ||
            passengerDetails.some(p => !p.name || !p.age)
          }
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookFlight;

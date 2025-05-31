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

  // Fetch flight data on mount
  useEffect(() => {
    fetchFlightData();
  }, []);

  const fetchFlightData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fetch-flight/${id}`);
      setFlightName(response.data.flightName);
      setFlightId(response.data.flightId);
      setBasePrice(response.data.basePrice);
      setStartCity(response.data.origin);
      setDestinationCity(response.data.destination);
      setStartTime(response.data.departureTime || '');
    } catch (error) {
      console.error('Failed to fetch flight data:', error);
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

  // Handle passenger count change
  const handlePassengerChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
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

  // Booking function with validation
  const bookFlight = async () => {
    if (!email || !mobile || !coachType || numberOfPassengers <= 0) {
      alert('Please fill all required fields (email, mobile, seat class, and passengers).');
      return;
    }

    for (let i = 0; i < passengerDetails.length; i++) {
      const p = passengerDetails[i];
      if (!p.name || !p.age) {
        alert(`Please fill details for passenger ${i + 1}`);
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
      alert('Booking successful');
      navigate('/bookings');
    } catch (error) {
      console.error('Booking error:', error.response || error.message);
      alert('Booking failed!!');
    }
  };

  return (
    <div className="BookFlightPage">
      <div className="BookingFlightPageContainer">
        <h2>Book ticket</h2>
        <span>
          <p><b>Flight Name: </b> {flightName}</p>
          <p><b>Flight No: </b> {flightId}</p>
        </span>
        <span>
          <p><b>Base price: </b> {basePrice}</p>
        </span>

        <span>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInputemail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <label htmlFor="floatingInputemail">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInputmobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
            />
            <label htmlFor="floatingInputmobile">Mobile</label>
          </div>
        </span>

        <span className="span3">
          <div className="no-of-passengers">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInputnoPassengers"
                value={numberOfPassengers}
                onChange={handlePassengerChange}
                min="0"
              />
              <label htmlFor="floatingInputnoPassengers">No of passengers</label>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="floatingInputjourneyDate"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              placeholder="Journey Date"
            />
            <label htmlFor="floatingInputjourneyDate">Journey date</label>
          </div>

          <div className="form-floating">
            <select
              className="form-select form-select-sm mb-3"
              value={coachType}
              onChange={(e) => setCoachType(e.target.value)}
              aria-label="Seat Class"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="economy">Economy class</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business class</option>
              <option value="first-class">First class</option>
            </select>
            <label htmlFor="floatingSelect">Seat Class</label>
          </div>
        </span>

        <div className="new-passengers">
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
                    min="0"
                  />
                  <label htmlFor={`floatingInputpassengerAge${index}`}>Age</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h6>
          <b>Total price</b>: {totalPrice}
        </h6>
        <button className="btn btn-primary" onClick={bookFlight}>
          Book now
        </button>
      </div>
    </div>
  );
};

export default BookFlight;

import React, { useContext, useEffect, useState } from 'react'
import '../styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {

  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('userType') === 'admin'){
      navigate('/admin');
    } else if(localStorage.getItem('userType') === 'flight-operator'){
      navigate('/flight-admin');
    }
  }, []);

  // Sample flights data (hardcoded)
const sampleFlights = [
  { _id: "1", flightName: "Indigo", flightId: "IND101", origin: "Chennai", destination: "Mumbai", departureTime: "06:00 AM", arrivalTime: "08:30 AM", basePrice: 4500, totalSeats: 60 },
  { _id: "2", flightName: "Air India", flightId: "AI102", origin: "Mumbai", destination: "Delhi", departureTime: "09:00 AM", arrivalTime: "11:30 AM", basePrice: 5000, totalSeats: 55 },
  { _id: "3", flightName: "SpiceJet", flightId: "SG103", origin: "Delhi", destination: "Kolkata", departureTime: "01:00 PM", arrivalTime: "03:30 PM", basePrice: 4800, totalSeats: 50 },
  { _id: "4", flightName: "Vistara", flightId: "VT104", origin: "Kolkata", destination: "Bangalore", departureTime: "04:00 PM", arrivalTime: "06:30 PM", basePrice: 4700, totalSeats: 58 },
  { _id: "5", flightName: "GoAir", flightId: "GO105", origin: "Bangalore", destination: "Chennai", departureTime: "07:00 AM", arrivalTime: "08:15 AM", basePrice: 3500, totalSeats: 45 },
  { _id: "6", flightName: "Indigo", flightId: "IND106", origin: "Hyderabad", destination: "Mumbai", departureTime: "02:00 PM", arrivalTime: "04:00 PM", basePrice: 4200, totalSeats: 65 },
  { _id: "7", flightName: "Air India", flightId: "AI107", origin: "Chennai", destination: "Delhi", departureTime: "10:00 AM", arrivalTime: "12:45 PM", basePrice: 5100, totalSeats: 60 },
  { _id: "8", flightName: "SpiceJet", flightId: "SG108", origin: "Mumbai", destination: "Kolkata", departureTime: "05:00 PM", arrivalTime: "07:30 PM", basePrice: 5300, totalSeats: 52 },
  { _id: "9", flightName: "Vistara", flightId: "VT109", origin: "Delhi", destination: "Bangalore", departureTime: "08:00 AM", arrivalTime: "10:30 AM", basePrice: 4900, totalSeats: 57 },
  { _id: "10", flightName: "GoAir", flightId: "GO110", origin: "Kolkata", destination: "Hyderabad", departureTime: "06:00 PM", arrivalTime: "08:30 PM", basePrice: 4600, totalSeats: 49 },
  { _id: "11", flightName: "Indigo", flightId: "IND111", origin: "Bangalore", destination: "Delhi", departureTime: "09:00 AM", arrivalTime: "11:30 AM", basePrice: 4700, totalSeats: 50 },
  { _id: "12", flightName: "Air India", flightId: "AI112", origin: "Hyderabad", destination: "Kolkata", departureTime: "01:00 PM", arrivalTime: "03:30 PM", basePrice: 4800, totalSeats: 53 },
  { _id: "13", flightName: "SpiceJet", flightId: "SG113", origin: "Chennai", destination: "Hyderabad", departureTime: "07:00 AM", arrivalTime: "08:30 AM", basePrice: 3900, totalSeats: 56 },
  { _id: "14", flightName: "Vistara", flightId: "VT114", origin: "Mumbai", destination: "Bangalore", departureTime: "11:00 AM", arrivalTime: "01:30 PM", basePrice: 4400, totalSeats: 48 },
  { _id: "15", flightName: "GoAir", flightId: "GO115", origin: "Delhi", destination: "Chennai", departureTime: "03:00 PM", arrivalTime: "05:30 PM", basePrice: 5000, totalSeats: 54 },
  { _id: "16", flightName: "Indigo", flightId: "IND116", origin: "Kolkata", destination: "Mumbai", departureTime: "06:00 AM", arrivalTime: "08:30 AM", basePrice: 4700, totalSeats: 59 },
  { _id: "17", flightName: "Air India", flightId: "AI117", origin: "Bangalore", destination: "Kolkata", departureTime: "10:00 AM", arrivalTime: "12:30 PM", basePrice: 4500, totalSeats: 60 },
  { _id: "18", flightName: "SpiceJet", flightId: "SG118", origin: "Hyderabad", destination: "Chennai", departureTime: "02:00 PM", arrivalTime: "03:30 PM", basePrice: 4000, totalSeats: 55 },
  { _id: "19", flightName: "Vistara", flightId: "VT119", origin: "Chennai", destination: "Bangalore", departureTime: "04:00 PM", arrivalTime: "05:30 PM", basePrice: 3800, totalSeats: 52 },
  { _id: "20", flightName: "GoAir", flightId: "GO120", origin: "Mumbai", destination: "Hyderabad", departureTime: "06:00 PM", arrivalTime: "08:00 PM", basePrice: 4200, totalSeats: 50 },
  { _id: "21", flightName: "Indigo", flightId: "IND121", origin: "Delhi", destination: "Mumbai", departureTime: "09:00 AM", arrivalTime: "11:30 AM", basePrice: 5100, totalSeats: 60 },
  { _id: "22", flightName: "Air India", flightId: "AI122", origin: "Kolkata", destination: "Delhi", departureTime: "01:00 PM", arrivalTime: "03:30 PM", basePrice: 5000, totalSeats: 55 },
  { _id: "23", flightName: "SpiceJet", flightId: "SG123", origin: "Bangalore", destination: "Mumbai", departureTime: "05:00 PM", arrivalTime: "07:30 PM", basePrice: 4600, totalSeats: 52 },
  { _id: "24", flightName: "Vistara", flightId: "VT124", origin: "Hyderabad", destination: "Delhi", departureTime: "08:00 AM", arrivalTime: "10:30 AM", basePrice: 4900, totalSeats: 57 },
  { _id: "25", flightName: "GoAir", flightId: "GO125", origin: "Chennai", destination: "Kolkata", departureTime: "06:00 PM", arrivalTime: "08:30 PM", basePrice: 4700, totalSeats: 49 },
  { _id: "26", flightName: "Indigo", flightId: "IND126", origin: "Mumbai", destination: "Chennai", departureTime: "09:00 AM", arrivalTime: "11:30 AM", basePrice: 5000, totalSeats: 60 },
  { _id: "27", flightName: "Air India", flightId: "AI127", origin: "Delhi", destination: "Hyderabad", departureTime: "01:00 PM", arrivalTime: "03:30 PM", basePrice: 4900, totalSeats: 55 },
  { _id: "28", flightName: "SpiceJet", flightId: "SG128", origin: "Kolkata", destination: "Chennai", departureTime: "05:00 PM", arrivalTime: "07:30 PM", basePrice: 4800, totalSeats: 52 },
  { _id: "29", flightName: "Vistara", flightId: "VT129", origin: "Bangalore", destination: "Hyderabad", departureTime: "08:00 AM", arrivalTime: "10:30 AM", basePrice: 4500, totalSeats: 57 },
  { _id: "30", flightName: "GoAir", flightId: "GO130", origin: "Hyderabad", destination: "Mumbai", departureTime: "06:00 PM", arrivalTime: "08:30 PM", basePrice: 4300, totalSeats: 49 },
  { _id: "31", flightName: "Indigo", flightId: "IND131", origin: "Chennai", destination: "Bangalore", departureTime: "06:30 AM", arrivalTime: "08:00 AM", basePrice: 3700, totalSeats: 60 },
  { _id: "32", flightName: "Air India", flightId: "AI132", origin: "Mumbai", destination: "Kolkata", departureTime: "09:30 AM", arrivalTime: "12:00 PM", basePrice: 5200, totalSeats: 55 },
  { _id: "33", flightName: "SpiceJet", flightId: "SG133", origin: "Delhi", destination: "Bangalore", departureTime: "01:30 PM", arrivalTime: "04:00 PM", basePrice: 5100, totalSeats: 52 },
  { _id: "34", flightName: "Vistara", flightId: "VT134", origin: "Kolkata", destination: "Delhi", departureTime: "04:30 PM", arrivalTime: "07:00 PM", basePrice: 4700, totalSeats: 57 },
  { _id: "35", flightName: "GoAir", flightId: "GO135", origin: "Bangalore", destination: "Chennai", departureTime: "07:30 AM", arrivalTime: "09:00 AM", basePrice: 3600, totalSeats: 49 },
  { _id: "36", flightName: "Indigo", flightId: "IND136", origin: "Hyderabad", destination: "Kolkata", departureTime: "11:00 AM", arrivalTime: "01:30 PM", basePrice: 4600, totalSeats: 60 },
  { _id: "37", flightName: "Air India", flightId: "AI137", origin: "Chennai", destination: "Mumbai", departureTime: "02:00 PM", arrivalTime: "04:30 PM", basePrice: 4700, totalSeats: 55 },
  { _id: "38", flightName: "SpiceJet", flightId: "SG138", origin: "Mumbai", destination: "Delhi", departureTime: "06:00 PM", arrivalTime: "08:30 PM", basePrice: 5100, totalSeats: 52 },
  { _id: "39", flightName: "Vistara", flightId: "VT139", origin: "Delhi", destination: "Chennai", departureTime: "09:00 AM", arrivalTime: "11:30 AM", basePrice: 5000, totalSeats: 57 },
  { _id: "40", flightName: "GoAir", flightId: "GO140", origin: "Kolkata", destination: "Bangalore", departureTime: "12:00 PM", arrivalTime: "02:30 PM", basePrice: 4600, totalSeats: 49 },
  { _id: "41", flightName: "Indigo", flightId: "IND141", origin: "Bangalore", destination: "Delhi", departureTime: "03:00 PM", arrivalTime: "05:30 PM", basePrice: 4700, totalSeats: 60 },
  { _id: "42", flightName: "Air India", flightId: "AI142", origin: "Hyderabad", destination: "Chennai", departureTime: "06:00 AM", arrivalTime: "08:30 AM", basePrice: 3900, totalSeats: 55 },
  { _id: "43", flightName: "SpiceJet", flightId: "SG143", origin: "Chennai", destination: "Kolkata", departureTime: "09:00 AM", arrivalTime: "11:30 AM", basePrice: 4700, totalSeats: 52 },
  { _id: "44", flightName: "Vistara", flightId: "VT144", origin: "Mumbai", destination: "Bangalore", departureTime: "01:00 PM", arrivalTime: "03:30 PM", basePrice: 4500, totalSeats: 57 },
  { _id: "45", flightName: "GoAir", flightId: "GO145", origin: "Delhi", destination: "Hyderabad", departureTime: "04:00 PM", arrivalTime: "06:30 PM", basePrice: 4900, totalSeats: 49 },
  { _id: "46", flightName: "Indigo", flightId: "IND146", origin: "Kolkata", destination: "Chennai", departureTime: "07:00 PM", arrivalTime: "09:30 PM", basePrice: 4800, totalSeats: 60 },
  { _id: "47", flightName: "Air India", flightId: "AI147", origin: "Bangalore", destination: "Hyderabad", departureTime: "08:00 AM", arrivalTime: "10:30 AM", basePrice: 4100, totalSeats: 55 },
  { _id: "48", flightName: "SpiceJet", flightId: "SG148", origin: "Hyderabad", destination: "Delhi", departureTime: "11:00 AM", arrivalTime: "01:30 PM", basePrice: 5000, totalSeats: 52 },
  { _id: "49", flightName: "Vistara", flightId: "VT149", origin: "Chennai", destination: "Delhi", departureTime: "02:00 PM", arrivalTime: "04:30 PM", basePrice: 5200, totalSeats: 57 },
  { _id: "50", flightName: "GoAir", flightId: "GO150", origin: "Mumbai", destination: "Kolkata", departureTime: "05:00 PM", arrivalTime: "07:30 PM", basePrice: 5300, totalSeats: 49 }
];


  const [Flights, setFlights] = useState([]);

  // This function filters the sampleFlights based on search criteria
  const fetchFlights = () => {

    // Validation
    if(checkBox){
      if(departure !== "" && destination !== "" && departureDate && returnDate){
        const date = new Date();
        const date1 = new Date(departureDate);
        const date2 = new Date(returnDate);
        if(date1 > date && date2 > date1){
          setError("");
          // Filter flights from sampleFlights for round trip (either direction)
          const filtered = sampleFlights.filter(flight =>
            (flight.origin === departure && flight.destination === destination) ||
            (flight.origin === destination && flight.destination === departure)
          );
          setFlights(filtered);
        } else{ setError("Please check the dates"); }
      } else{ setError("Please fill all the inputs"); }
    }else{
      if(departure !== "" && destination !== "" && departureDate){
        const date = new Date();
        const date1 = new Date(departureDate);
        if(date1 >= date){
          setError("");
          // Filter flights for one-way trip
          const filtered = sampleFlights.filter(flight =>
            flight.origin === departure && flight.destination === destination
          );
          setFlights(filtered);
        } else{ setError("Please check the dates"); }      
      } else{ setError("Please fill all the inputs"); }
    }
  }

  const {setTicketBookingDate} = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  const handleTicketBooking = (id, origin, destination) => {
    if(userId){
      if(origin === departure){
        setTicketBookingDate(departureDate);
        navigate(`/book-flight/${id}`);
      } else if(destination === departure){
        setTicketBookingDate(returnDate);
        navigate(`/book-flight/${id}`);
      }
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
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e)=>setCheckBox(e.target.checked)} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Return journey</label>
          </div>

          <div className='Flight-search-container-body'>

            <div className="form-floating">
              <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example" value={departure} onChange={(e)=>setDeparture(e.target.value)}>
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
                {/*<option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Kolkata">Kolkata</option>
                <option value="varanasi">varanasi</option>
                <option value="Jaipur">Jaipur</option>8*/}
              </select>
              <label htmlFor="floatingSelect">Departure City</label>
            </div>

            <div className="form-floating">
              <select className="form-select form-select-sm mb-3" aria-label=".form-select-sm example" value={destination} onChange={(e)=>setDestination(e.target.value)}>
                <option value="" disabled>Select</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Banglore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
                {/*<option value="Pune">Pune</option>
                <option value="Trivendrum">Trivendrum</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Kolkata">Kolkata</option>
                <option value="varanasi">varanasi</option>
                <option value="Jaipur">Jaipur</option>*/}
              </select>
              <label htmlFor="floatingSelect">Destination City</label>
            </div>

            <div className="form-floating mb-3">
              <input type="date" className="form-control" id="floatingInputstartDate" value={departureDate} onChange={(e)=>setDepartureDate(e.target.value)}/>
              <label htmlFor="floatingInputstartDate">Journey date</label>
            </div>

            {checkBox ? 
              <div className="form-floating mb-3">
                <input type="date" className="form-control" id="floatingInputreturnDate" value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}/>
                <label htmlFor="floatingInputreturnDate">Return date</label>
              </div>
            : ""}

            <div>
              <button className="btn btn-primary" onClick={fetchFlights}>Search</button>
            </div>

          </div>
          <p style={{color: 'red'}}>{error}</p>
        </div>

        {Flights.length > 0 
          ?
          <>
            {
              Flights.filter(Flight => Flight.origin === departure && Flight.destination === destination).length > 0 ? 
              <>
                <div className="availableFlightsContainer">
                  <h1>Available Flights</h1>

                  <div className="Flights">

                    {checkBox ?
                      <>
                        {Flights.filter(Flight => (Flight.origin === departure && Flight.destination === destination ) || (Flight.origin === destination && Flight.destination === departure)).map((Flight) => {
                          return (
                            <div className="Flight" key={Flight._id}>
                              <div>
                                <p><b>{Flight.flightName}</b></p>
                                <p><b>Flight Number:</b> {Flight.flightId}</p>
                              </div>
                              <div>
                                <p><b>Start :</b> {Flight.origin}</p>
                                <p><b>Departure Time:</b> {Flight.departureTime}</p>
                              </div>
                              <div>
                                <p><b>Destination :</b> {Flight.destination}</p>
                                <p><b>Arrival Time:</b> {Flight.arrivalTime}</p>
                              </div>
                              <div>
                                <p><b>Starting Price:</b> {Flight.basePrice}</p>
                                <p><b>Available Seats:</b> {Flight.totalSeats}</p>
                              </div>
                              {/* <button className="button btn btn-primary" onClick={() => handleTicketBooking(Flight._id, Flight.origin, Flight.destination)}>Book Now</button> */}
                            </div>
                          )
                        })}
                      </>
                    :
                      <>
                        {Flights.filter(Flight => Flight.origin === departure && Flight.destination === destination).map((Flight) => {
                          return (
                            <div className="Flight" key={Flight._id}>
                              <div>
                                <p><b>{Flight.flightName}</b></p>
                                <p><b>Flight Number:</b> {Flight.flightId}</p>
                              </div>
                              <div>
                                <p><b>Start :</b> {Flight.origin}</p>
                                <p><b>Departure Time:</b> {Flight.departureTime}</p>
                              </div>
                              <div>
                                <p><b>Destination :</b> {Flight.destination}</p>
                                <p><b>Arrival Time:</b> {Flight.arrivalTime}</p>
                              </div>
                              <div>
                                <p><b>Starting Price:</b> {Flight.basePrice}</p>
                                <p><b>Available Seats:</b> {Flight.totalSeats}</p>
                              </div>
                              {/* <button className="button btn btn-primary" onClick={() => handleTicketBooking(Flight._id, Flight.origin, Flight.destination)}>Book Now</button> */}
                            </div>
                          )
                        })}
                      </>
                    }

                  </div>
                </div>
              </>
              :
              <>
                <div className="availableFlightsContainer">
                  <h1>No Flights</h1>
                </div>
              </>
            }
          </>
          : <></>
        }
      </div>

      <section id="about" className="section-about p-4">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">
            &nbsp; &nbsp;&nbsp; &nbsp; Welcome to  Flight Ticket management app, where we're committed to delivering a seamless travel experience from beginning to end. Whether you're heading out for a daily commute, planning an exciting cross-country trip, or looking for a peaceful scenic flight, our app offers a wide variety of options to match your travel needs.
          </p>
          <p className="section-description">
            &nbsp; &nbsp;&nbsp; &nbsp; We know how essential convenience and efficiency are when planning your journey. Our easy-to-use interface lets you quickly browse through available flight schedules, compare prices, and select the seating option that suits you best. In just a few simple steps, you can secure your flight and move closer to your destination. Our streamlined booking process allows you to personalize your travel, from choosing specific departure times to selecting a window seat or accommodating special requests.
          </p>
          <p className="section-description">
            &nbsp; &nbsp;&nbsp; &nbsp; With our app, you can look forward to discovering new places, taking in stunning views, and creating lasting memories. Begin your adventure today and let us help turn your travel dreams into reality. Enjoy the convenience, reliability, and comfort our app provides, and take off on unforgettable journeys with peace of mind.
          </p>

          <span><h5>2024 SKY Furaito - &copy; All rights reserved</h5></span>

        </div>
      </section>
    </div>
  )
}

export default LandingPage
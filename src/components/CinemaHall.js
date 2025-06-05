import React, { useEffect, useState } from 'react';

const ROWS = 5;
const COLS = 8;

const CinemaHall = ({ movieId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(`booked_${movieId}`);
    if (stored) {
      setBookedSeats(JSON.parse(stored));
    }
  }, [movieId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = () => {
    const updated = [...bookedSeats, ...selectedSeats];
    localStorage.setItem(`booked_${movieId}`, JSON.stringify(updated));
    setBookedSeats(updated);
    setSelectedSeats([]);
  };

  const renderSeats = () => {
    const seats = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const seat = `${row}-${col}`;
        const isBooked = bookedSeats.includes(seat);
        const isSelected = selectedSeats.includes(seat);
        seats.push(
          <div
            key={seat}
            className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : ''}`}
            onClick={() => toggleSeat(seat)}
          />
        );
      }
    }
    return seats;
  };

  return (
    <>
      <div className="hall">{renderSeats()}</div>
      {selectedSeats.length > 0 && (
        <>
          <p>Вибрані місця: {selectedSeats.join(', ')}</p>
          <button onClick={handleBooking}>Підтвердити бронювання</button>
        </>
      )}
    </>
  );
};

export default CinemaHall;

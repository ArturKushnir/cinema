import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = 'Ya101a0c6';

const rows = 5;
const seatsPerRow = 8;

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Завантаження даних фільму
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovieDetails();

    // Завантаження заброньованих місць з localStorage
    const savedSeats = JSON.parse(localStorage.getItem(`bookedSeats-${id}`)) || [];
    setBookedSeats(savedSeats);
  }, [id]);

  // Обробка вибору місця
  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // Заброньоване - не можна вибрати

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Підтвердження бронювання
  const handleBooking = () => {
    const newBooked = [...bookedSeats, ...selectedSeats];
    setBookedSeats(newBooked);
    setSelectedSeats([]);
    localStorage.setItem(`bookedSeats-${id}`, JSON.stringify(newBooked));
    
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate('/')}>Назад</button>
      <h2>Зал для фільму {movie ? movie.Title : 'завантаження...'}</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${seatsPerRow}, 40px)`,
          gap: '10px',
          marginTop: '20px',
          justifyContent: 'center',
        }}
      >
        {Array.from({ length: rows }).map((_, rowIndex) =>
          Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
            const seatId = `${rowIndex + 1}-${seatIndex + 1}`;
            const isBooked = bookedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);

            return (
              <div
                key={seatId}
                onClick={() => toggleSeat(seatId)}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: isBooked ? 'gray' : isSelected ? 'blue' : 'green',
                  cursor: isBooked ? 'not-allowed' : 'pointer',
                  borderRadius: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  userSelect: 'none',
                }}
                title={`Ряд ${rowIndex + 1}, Місце ${seatIndex + 1}`}
              >
                {seatIndex + 1}
              </div>
            );
          })
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Вибрані місця:</h3>
        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Немає вибраних місць'}
      </div>

      <button
        style={{ marginTop: 20 }}
        disabled={selectedSeats.length === 0}
        onClick={handleBooking}
      >
        Забронювати
      </button>
    </div>
  );
};

export default Booking;

import CalendarInfo from "@/components/Calendar";
import CalendarInfoByDay from "@/components/CalendarInfoByDay";
import Layout from "@/components/Layout";
import axios from "axios";
import { format, parse } from "date-fns";
import React, { useEffect, useState } from "react";

export default function FlyReservationPage() {
  const [reservations, setReservations] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getReservations = async () =>
      await axios
        .get("/api/planeReservation")
        .then((res) => {
          setMessage(null);
          setReservations(res.data.reservations);
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });

    getReservations();
  }, []);

  const handleDayClick = (date) => {
    setSelectedDay(format(date, "dd/MM/yyyy"));
  };

  const filteredReservations = reservations?.filter((res) => {
    const reservationsDate = format(
      parse(res.day, "dd/MM/yyyy", new Date()),
      "dd/MM/yyyy"
    );
    return reservationsDate === selectedDay;
  });

  return (
    <Layout>
      <main className="mt-8">
        <h1 className="font-normal text-4xl text-white text-center mb-4">
          Reservas de Vuelos
        </h1>
        {message && <h2>{message}</h2>}
        <section className="flex flex-col items-center">
          <CalendarInfo
            reservations={reservations}
            onDayClick={handleDayClick}
          />
          {selectedDay && (
            <CalendarInfoByDay reservations={filteredReservations} />
          )}
        </section>
      </main>
    </Layout>
  );
}

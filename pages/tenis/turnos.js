import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { ClubUsers } from "@/model/ClubUsers";
import { TennisReservation } from "@/model/TennisReservation";
import { format, addDays, startOfDay, endOfDay, parseISO } from "date-fns";
import { es } from "date-fns/locale";

function TennisReservationsPage({ reservations }) {
  const today = new Date();
  const nextWeek = addDays(today, 7);

  // Filtrar las reservaciones por día
  const reservationsByDay = [];
  let currentDay = startOfDay(today);

  while (currentDay <= nextWeek) {
    const dayReservations = reservations.filter(
      (reservation) =>
        parseISO(reservation.reservationDate) >= currentDay &&
        parseISO(reservation.reservationDate) < addDays(currentDay, 1)
    );

    if (dayReservations.length > 0) {
      reservationsByDay.push({
        day: currentDay,
        reservations: dayReservations,
      });
    }

    currentDay = addDays(currentDay, 1);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Layout>
      <div className="px-4 py-5">
        <h1 className="bg-white w-full text-center py-2 rounded text-xl font-medium mb-4">
          Turnos de Tenis
        </h1>
        {reservationsByDay.map((day, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-lg font-semibold mb-2">
              {capitalizeFirstLetter(
                format(day.day, "EEEE, d 'de' MMMM", { locale: es })
              )}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {day.reservations
                .sort((a, b) =>
                  a.reservationTime.localeCompare(b.reservationTime)
                )
                .map((reservation) => (
                  <div
                    key={reservation._id}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <p className="text-gray-600 font-medium text-lg">
                      {reservation.userName}
                    </p>
                    <p className="text-gray-600">
                      Hora: {reservation.reservationTime}
                    </p>
                    <p className="text-gray-600">Cancha: {reservation.court}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default TennisReservationsPage;

export async function getServerSideProps() {
  try {
    await mongooseConnect();
    const reservations = await TennisReservation.find();

    const reservationsData = await Promise.all(
      reservations.map(async (res) => {
        const user = await ClubUsers.findById(res.user.toString());
        return {
          id: res._id.toString(),
          userName: user ? user.name : "Usuario desconocido",
          court: res.court,
          reservationDate: res.reservationDate,
          reservationTime: res.reservationTime,
        };
      })
    );

    return {
      props: {
        reservations: reservationsData,
      },
    };
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    return {
      props: {
        reservations: [],
      },
    };
  }
}

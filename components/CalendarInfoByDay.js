import React from "react";

export default function CalendarInfoByDay({ reservations }) {
  const sortedReservations = [...reservations].sort((a, b) => {
    const timeA = new Date(`2000-01-01T${a.time}`);
    const timeB = new Date(`2000-01-01T${b.time}`);
    return timeA - timeB;
  });

  return (
    <div className="flex flex-col items-center w-full md:w-4/6 lg:w-1/2 xl:w-1/3 gap-4 bg-white p-5 rounded-lg mt-4 mb-10">
      {sortedReservations.length > 0 ? (
        <>
          <h2 className="text-gray-700 text-2xl font-medium mb-4">
            Reservas del Día
          </h2>
          {sortedReservations.map((res) => (
            <div
              key={res._id}
              className="w-full text-center bg-gray-200 rounded-lg py-3 px-4"
            >
              <h5 className="font-semibold text-lg">{res.name}</h5>
              <span className="text-lg">{res.time}</span>
            </div>
          ))}
        </>
      ) : (
        <h3 className="text-gray-700 text-xl font-medium text-center">
          No se encuentran reservas de esta fecha
        </h3>
      )}
    </div>
  );
}

import React, { useState } from "react";
import Calendar from "react-calendar";
import NoSsr from "./NoSsr";

export default function CalendarInfo({ reservations, onDayClick }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDayClick(date);
  };

  return (
    <NoSsr>
      <div className="flex flex-col items-center max-w-xl">
        <Calendar
          className="mt-4"
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
    </NoSsr>
  );
}

import React from "react";
import {ContactPicker} from '../contactPicker/ContactPicker';

const getTodayString = () => {
  const [month, day, year] = new Date()
    .toLocaleDateString("en-US")
    .split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const AppointmentForm = ({
  contacts,
  title,
  setTitle,
  contact,
  setContact,
  date,
  setDate,
  time,
  setTime,
  handleSubmit
}) => {

  const handleChange = (e) => {
    setContact(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="appointmentTitle">Appointment Name:</label>
      <input type="text" id="appointmentTitle" onChange={(e) => setTitle(e.target.value)} value={title} required />
      <label htmlFor="appointmentDate">Appointment Date:</label>
      <input
        type="date" 
        id="appointmentDate" 
        onChange={(e) => setDate(e.target.value)} 
        value={date} 
        required 
        min={getTodayString()}/>
      <label htmlFor="appointmentTime">Appointment Time:</label>
      <input type="time" id="appointmentTime" onChange={(e) => setTime(e.target.value)} value={time} required />
      <ContactPicker contacts={contacts} handleChange={handleChange} value={contact} name={contact} />
      <button>Add Appointment</button>
    </form>
  );
};

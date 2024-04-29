import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom"
import Root, { ROUTES } from "./components/root/Root";
import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {
  const [contactData, setContactData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);

  const addContact = (name, phone, email) => {
    setContactData((prevContactData) => [...prevContactData, {name: name, phone: phone, email: email}] );
  }

  const addAppointment = (name, contact, date, time) => {
    setAppointmentData((prevAppointmentData) => [...prevAppointmentData, {name: name, contact: contact, date: date, time: time}] );
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
      <Route index element={ <Navigate to={ROUTES.CONTACTS} replace/> }/>
      <Route path={ROUTES.CONTACTS} element={ <ContactsPage contacts={contactData} addContact={addContact} />}/>
      <Route
        path={ROUTES.APPOINTMENTS}
        element={ <AppointmentsPage appointments={appointmentData} contacts={contactData} addAppointment={addAppointment} />}/>
    </Route>
  ));
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

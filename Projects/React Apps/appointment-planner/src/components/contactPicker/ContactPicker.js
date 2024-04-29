import React from "react";

export const ContactPicker = ({contacts, handleChange, value, name}) => {
  return (
    <select onChange={handleChange} defaultValue="" name={name}>
      <option value="">No Contact Selected</option>
      {contacts.map((contact) => {
        return <option value={contact.name} key={contact.name}>{contact.name}</option>
      })}
    </select>
  );
};

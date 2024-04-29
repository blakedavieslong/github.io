import React from "react";

export const ContactForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="contactName">Contact's Name:</label>
      <input type="text" id="contactName" onChange={(e) => setName(e.target.value)} value={name} required />
      <label htmlFor="contactPhone">Contact's Phone Number:</label>
      <input
        type="tel" 
        id="contactPhone" 
        onChange={(e) => setPhone(e.target.value)} 
        value={phone} 
        required 
        pattern="((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}" 
        placeholder="(XXX) XXX-XXXX"/>
      <label htmlFor="contactEmail">Contact's Email:</label>
      <input type="email" id="contactEmail" onChange={(e) => setEmail(e.target.value)} value={email} required />
      <button>Add Contact</button>
    </form>
  );
};


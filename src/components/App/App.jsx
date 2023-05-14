import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import  ContactForm  from "../ContactForm/ContactForm" ;
import  ContactsList  from "../ContactsList/ContactsList";
import  Filter  from "../Filter/Filter";
import css from "./App.module.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const addedContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (addedContact) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts((prevContacts) => [contact, ...prevContacts]);
    }
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onFilterChange={changeFilter} />
      <ContactsList contacts={getVisibleContacts()} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;

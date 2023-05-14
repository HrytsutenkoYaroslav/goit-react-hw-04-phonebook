
////////////////////////////////////////
import React, { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "../ContactForm/ContactForm";
import { ContactsList } from "../ContactsList/ContactsList";
import { Filter } from "../Filter/Filter";
import css from "./App.module.css";

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    }

    const addedContact = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (addedContact) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState((prevState) => ({
        contacts: [contact, ...prevState.contacts]
      }));
    }
  }

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  }

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onFilterChange={this.changeFilter}/>
        <ContactsList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

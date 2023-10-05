import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ConstactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  addContact = newContact => {
    const loweredName = newContact.name.toLowerCase().trim();

    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase().trim() === loweredName
      )
    ) {
      return alert(`${newContact.name} is already in Your contacts!`);
    }

    if (
      this.state.contacts.find(contact => contact.number === newContact.number)
    ) {
      return alert(`${newContact.number} is already in Your contacts!`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, newContact],
      }));
    }
  };

  addFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  render() {
    const { filter } = this.state;

    return (
      <section className={css.content}>
        <div className={css.content__container}>
          <ContactForm addContact={this.addContact} />
          <ContactList
            contacts={this.filteredContacts()}
            deleteContact={this.deleteContact}
          >
            <Filter filter={filter} addFilter={this.addFilter} />
          </ContactList>
        </div>
      </section>
    );
  }
}

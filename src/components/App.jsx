import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const contactsData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? contactsData;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.contacts.length !== 0 &&
  //     prevState.contacts.length !== this.state.contacts.length
  //   ) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const handleSubmitInForm = (name, number) => {
    const duplicateName = contacts.find(contact => contact.name === name); // searching duplicate names in input Name
    if (duplicateName) {
      alert(name + ' is already in contacts.');
      return;
    }

    setContacts(prevState => {
      return [
        ...prevState,
        {
          id: nanoid(),
          name: name,
          number: number,
        },
      ];
    });
  };

  const handleFilterChange = event => {
    const searchedContact = event.target.value.trim().toLowerCase();
    setFilter(searchedContact);
  };

  const handleDeleteBtn = id => {
    setContacts(prevState => {
      const newContacts = prevState.filter(contact => contact.id !== id);
      return newContacts;
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().split(' ').join('').includes(filter)
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 22,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmitInForm={handleSubmitInForm}></ContactForm>

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteBtn} />
    </div>
  );
}

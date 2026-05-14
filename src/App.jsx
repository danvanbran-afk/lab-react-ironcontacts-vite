import { useState } from "react";
import contactsData from "./contacts.json";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));

  const addRandomContact = () => {
    const remainingContacts = contactsData.filter(
      (contact) => !contacts.some((c) => c.id === contact.id)
    );

    if (remainingContacts.length === 0) {
      alert("All contacts are already added!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    setContacts((prevContacts) => [...prevContacts, randomContact]);
  };

  const sortByName = () => {
    const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    setContacts(sorted);
  };

  const sortByPopularity = () => {
    const sorted = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sorted);
  };

  const deleteContact = (id) => {
    const filtered = contacts.filter((contact) => contact.id !== id);
    setContacts(filtered);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>

      <div className="actions-bar">
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortByName}>Sort by name</button>
        <button onClick={sortByPopularity}>Sort by popularity</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td className="contact-name">{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? "🏆" : ""}</td>
              <td>{contact.wonEmmy ? "🌟" : ""}</td>
              <td>
                <button 
                  className="btn-delete" 
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

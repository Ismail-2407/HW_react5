import React, { useState, useEffect } from "react";
import "./App.css";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editContactId, setEditContactId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = () => {
    if (name.trim() === "" || phone.trim() === "") {
      alert("enter a name and phone number");
      return;
    }
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
    };
    setContacts([...contacts, newContact]);
    setName("");
    setPhone("");
  };

  const handleDeleteContact = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleEditContact = (id: number, name: string, phone: string) => {
    setEditContactId(id);
    setEditName(name);
    setEditPhone(phone);
  };

  const handleSaveEdit = () => {
    if (editName.trim() === "" || editPhone.trim() === "") {
      alert("enter a name and phone number");
      return;
    }
    const updatedContacts = contacts.map((contact) =>
      contact.id === editContactId
        ? { ...contact, name: editName, phone: editPhone }
        : contact
    );
    setContacts(updatedContacts);
    setEditContactId(null);
    setEditName("");
    setEditPhone("");
  };

  const handleCancelEdit = () => {
    setEditContactId(null);
    setEditName("");
    setEditPhone("");
  };

  return (
    <div className="app-container">
      <h1>Phone book</h1>
      <div className="add-contact-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAddContact}>Add</button>
      </div>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            {editContactId === contact.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span className="contact-name">{contact.name}</span>
                <span className="contact-phone">{contact.phone}</span>
                <div className="button-container">
                  <button
                    onClick={() =>
                      handleEditContact(contact.id, contact.name, contact.phone)
                    }
                  >
                    Redact
                  </button>
                  <button onClick={() => handleDeleteContact(contact.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

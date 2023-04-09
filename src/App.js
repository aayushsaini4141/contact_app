import "./App.css";
import { useState } from "react";

function App() {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [contacts, setContacts] = useState([
    { id: 1, name: "Priyanshu", contact: "7017413590" },
    { id: 2, name: "Anuj", contact: "9690009778" },
    { id: 3, name: "Ayush", contact: "8445446569" },
    { id: 4, name: "John Abrahim", contact: "7017413590" },
    { id: 5, name: "Salman", contact: "7017413590" },
  ]);

  const addNewContact = (e) => {
    e.preventDefault();
    setSearchResults([]);
    if (isEditing) {
      var updatedContacts = contacts.map((con) => {
        if (con.id === id) {
          con.name = name;
          con.contact = contact;
        }
        return con;
      });

      setContacts(updatedContacts);
      setIsEditing(false);
    } else {
      //add the logic here
      //find index of contact==input contact
      //if(index !== -1) return
      //else setContact chala de 
      setContacts([...contacts, { id: contacts.length + 1, name, contact }]);
    }
    setName("");
    setId();
    setContact("");
  };

  const editContact = (contact) => {
    setIsEditing(true);
    setId(contact.id);
    setName(contact.name);
    setContact(contact.contact);
  };

  const deleteContact = (contact) => {
    setSearchResults([]);
    var updatedContacts = contacts.filter((con) => con.id !== contact.id);
    setContacts(updatedContacts);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    // Filter contacts based on search term
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredContacts);
  };

  return (
    <div className="App container mx-10 p-4">
      <h1>Contact App</h1>
      <form
        className="m-4 border p-4 rounded bg-dark text-light"
        onSubmit={addNewContact}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Contact Number
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
          />
          <p id="emailHelp" class="form-text text-danger fs-6 font-italic">
            Contact Number should not be duplicate
          </p>
        </div>

        <button type="submit" class="btn btn-success">
          {isEditing ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Search Contact
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleSearch}
          value={searchTerm}
          placeholder="Search Contact"
        />
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Contact</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(searchResults.length > 0 ? searchResults : contacts).map(
            (contact) => (
              <tr>
                <th scope="row">{contact.id}</th>
                <td>{contact.name}</td>
                <td>{contact.contact}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-sm mx-2 btn-outline-dark"
                    onClick={() => editContact(contact)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    onClick={() => deleteContact(contact)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

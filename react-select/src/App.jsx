import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedCheck, setSelectedCheck] = useState(new Set());

  useEffect(() => {
    const fetchUser = () => {
      if (searchTerm.trim() === "") {
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSuggestions(data))
        .catch((error) => {
          console.error(error);
        });
    };

    fetchUser();
  }, [searchTerm]);

  const handleSelect = (user) => {
    setSelected([...selected, user]);
    setSelectedCheck(new Set([...selectedCheck, user.email]));
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <div className="search-input">
        <div className="">
          <input
            type="text"
            name=""
            id=""
            placeholder="make your search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <ul className="suggestions">
            {suggestions?.users?.map((user) =>
              !selectedCheck.has(user.email) ? (
                <li key={user.email} onClick={() => handleSelect(user)}>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </li>
              ) : (
                <></>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

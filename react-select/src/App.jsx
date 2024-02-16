import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./components/Pill";
import Suggestion from "./components/Suggestion";
import search from "./assets/search.png";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedCheck, setSelectedCheck] = useState(new Set());

  const inputRef = useRef();

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
    inputRef.current.focus();
  };

  const handleRemove = (user) => {
    const updatedSelect = selected.filter((select) => select.id !== user.id);
    setSelected(updatedSelect);

    const updatedSelectCheck = new Set(selectedCheck);
    updatedSelectCheck.delete(user.email);
    setSelectedCheck(updatedSelectCheck);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.value === "" && selected.length > 0) {
      const lastSelect = selected[selected.length - 1];
      handleRemove(lastSelect);
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container">
      <div className="search-content">
        <div className="search">
          <h3>Multiple-Select Feature Using React</h3>
          <div className="pills">
            {selected.map((user) => (
              <Pill
                key={user.email}
                image={user.image}
                text={`${user.firstName} ${user.lastName}`}
                handleClick={() => handleRemove(user)}
              />
            ))}
          </div>

          <div className="search-input">
            <img src={search} alt="search" />
            <input
              type="text"
              ref={inputRef}
              placeholder="search hundreds of users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="suggestions">
            {suggestions?.users?.map((user) =>
              !selectedCheck.has(user.email) ? (
                <Suggestion
                  key={user.email}
                  image={user.image}
                  text={`${user.firstName} ${user.lastName}`}
                  handleClick={() => handleSelect(user)}
                />
              ) : (
                <></>
              )
            )}
            {/* <ul className="suggestions">
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
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

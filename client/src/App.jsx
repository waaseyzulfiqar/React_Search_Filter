import { useEffect, useState } from "react";
import "./App.css";
import Table from "./table";
import axios from 'axios';

function App() {
  const [userInput, setUserInput] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000');
        setUsersData(res.data);
        setError(null);
        setNoResults(false);
      } catch (error) {
        setError(error.message);
        setNoResults(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const debounceTimeout = setTimeout(() => {
      if (userInput) {
        const fetchFilteredData = async () => {
          setLoading(true);
          try {
            const res = await axios.get(`http://localhost:5000?q=${userInput}`);
            setUsersData(res.data);
            setError(null);
            setNoResults(res.data.length === 0);
          } catch (error) {
            setError(error.message);
            setNoResults(false);
          } finally {
            setLoading(false);
          }
        };
        fetchFilteredData();
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [userInput]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  return (
    <div className="App">
      <input
        className="search"
        placeholder="Search users..."
        value={userInput}
        onChange={handleInputChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : noResults ? (
        <p>No results found for "{userInput}"</p>
      ) : (
        <Table data={usersData} />
      )}
    </div>
  );
}

export default App;
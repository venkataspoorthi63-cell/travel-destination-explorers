import { useState } from "react";
import "./App.css";

const destinations = [
  {
    id: 1,
    name: "Goa",
    country: "India",
    category: "Beach",
    budget: 15000,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Ooty",
    country: "India",
    category: "Hill Station",
    budget: 10000,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Manali",
    country: "India",
    category: "Hill Station",
    budget: 18000,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    category: "City",
    budget: 60000,
    rating: 4.9,
  },
  {
    id: 5,
    name: "Dubai",
    country: "UAE",
    category: "City",
    budget: 45000,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    budget: 35000,
    rating: 4.8,
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sort, setSort] = useState("Default");

  let results = destinations.filter((destination) => {
    const searchText = search.toLowerCase();

const matchesSearch =
  destination.name.toLowerCase().includes(searchText) ||
  destination.country.toLowerCase().includes(searchText) ||
  destination.category.toLowerCase().includes(searchText);

    const matchesCountry =
      country === "All" || destination.country === country;

    const matchesCategory =
      category === "All" || destination.category === category;

    const matchesBudget =
      budget === "All" ||
      (budget === "Low" && destination.budget <= 15000) ||
      (budget === "Medium" &&
        destination.budget > 15000 &&
        destination.budget <= 35000) ||
      (budget === "High" && destination.budget > 35000);

    return (
      matchesSearch &&
      matchesCountry &&
      matchesCategory &&
      matchesBudget
    );
  });

  if (sort === "Low to High") {
    results.sort((a, b) => a.budget - b.budget);
  }

  if (sort === "High to Low") {
    results.sort((a, b) => b.budget - a.budget);
  }

  if (sort === "Rating") {
    results.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="app">
      <header>
        <h1>🌍 Travel Destination Explorer</h1>
        <p>Search and discover your perfect destination</p>
      </header>

      <main>
        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters">
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="All">All Countries</option>
            <option value="India">India</option>
            <option value="France">France</option>
            <option value="UAE">UAE</option>
            <option value="Indonesia">Indonesia</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Beach">Beach</option>
            <option value="Hill Station">Hill Station</option>
            <option value="City">City</option>
          </select>

          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="All">All Budgets</option>
            <option value="Low">Low Budget</option>
            <option value="Medium">Medium Budget</option>
            <option value="High">High Budget</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="Default">Sort By</option>
            <option value="Low to High">Price: Low to High</option>
            <option value="High to Low">Price: High to Low</option>
            <option value="Rating">Highest Rating</option>
          </select>
        </div>

        <h2>Destinations ({results.length})</h2>

        <div className="destination-grid">
          {results.length > 0 ? (
            results.map((destination) => (
              <div className="card" key={destination.id}>
                <div className="image-placeholder">🏝️</div>

                <div className="card-content">
                  <h3>{destination.name}</h3>

                  <p>
                    📍 {destination.country} • {destination.category}
                  </p>

                  <p>⭐ {destination.rating}</p>

                  <strong>💰 ₹{destination.budget.toLocaleString()}</strong>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No destinations found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
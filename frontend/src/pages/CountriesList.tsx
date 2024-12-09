import React, { useEffect, useState } from "react";
import Country from "../components/Country.tsx";

export default function CountriesList() {
  const [countries, setCountries] = useState<
    { name: string; countryCode: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/countries`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred while fetching the countries.");
      });
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 max-w-[1440px] mx-auto px-[20px] py-[40px]">
      <h1 className="text-3xl font-bold mb-4">Available Countries</h1>
      <p className="text-lg mb-8">
        This list contains the available countries 🌍. Click on any country to
        explore detailed information about it 📚
      </p>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-[15px]">
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Country country={country} />
          </li>
        ))}
      </ul>
    </div>
  );
}

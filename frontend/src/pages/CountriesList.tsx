import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CountriesList() {
  const [countries, setCountries] = useState<
    { name: string; countryCode: string }[]
  >([]);

  useEffect(() => {
    setCountries([{ name: "Ukraine", countryCode: "UA" }]);
    // fetch(`${process.env.REACT_APP_API_URL}/api/countries`)
    //   .then(res => res.json())
    //   .then(setCountries)
    //   .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Countries</h1>
      <ul className="space-y-2">
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link
              to={`/country/${country.countryCode}`}
              className="text-blue-500 hover:underline"
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

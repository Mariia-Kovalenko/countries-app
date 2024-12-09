import { Link } from "react-router-dom";
import React from "react";

interface ICountryProps {
  country: {
    countryCode: string;
    name: string;
  };
}

export default function Country({ country }: ICountryProps) {
  return (
    <div>
      <Link
        to={`/country/${country.countryCode}`}
        className="text-customPurple hover:underline"
      >
        {country.name}
      </Link>
    </div>
  );
}

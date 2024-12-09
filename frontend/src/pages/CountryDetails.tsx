import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Chart from "../components/Chart.tsx";
// Assuming you're using Chart.js for the population chart

export interface CountryData {
  officialName: string;
  flag: string;
  borders: string[];
  populationCounts: { year: number; value: number }[];
}

export default function CountryDetails() {
  const { code } = useParams<{ code: string }>();
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/countries/${code}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }
        const data = await response.json();
        setCountryData(data);

        console.log(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch country details");
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [code]);

  if (loading) {
    return (
      <div className="p-4 text-2xl max-w-[1440px] mx-auto px-[20px] py-[40px] text-customPurple">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-[1440px] mx-auto px-[20px] py-[40px]">
        <a
          className="text-lightGrey flex items-center mb-8 hover:underline"
          href="/"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.1035 21.207L11.8966 15.0001L18.1035 8.79321"
              stroke="#1B1B1B"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to countries list
        </a>
        <p className="text-2xl text-customRed">{error}</p>
      </div>
    );
  }

  if (!countryData) {
    return <div>No country data available</div>;
  }

  return (
    <div className="p-4 max-w-[1440px] mx-auto px-[20px] py-[40px]">
      <div className="flex gap-2 mb-8">
        <a className="text-lightGrey" href="/">
          Countries
        </a>
        /<span className="font-semibold">{countryData.officialName}</span>
      </div>

      <div className="flex items-center gap-10 mb-10 lg:max-w-[60%]">
        <h1 className="text-3xl font-bold">{countryData.officialName}</h1>
        {countryData.flag && (
          <div className="w-20 h-12">
            <img
              src={countryData.flag}
              alt={`${countryData.officialName} Flag`}
              className="w-full h-full object-cover border-[1px] border-[#efefef]"
            />
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-6">Border Countries:</h3>
      <ul className="grid grid-cols-2 gap-[15px] max-w-[60%] mb-10 text-lg">
        {countryData.borders.length ? (
          countryData.borders.map(({ countryCode, commonName }: any, i) => (
            <li key={i}>
              <Link
                to={`/country/${countryCode}`}
                className="text-customPurple hover:underline"
              >
                {commonName}
              </Link>
            </li>
          ))
        ) : (
          <div className="text-customPurple">
            {countryData.officialName} is not bordered by any country
          </div>
        )}
      </ul>

      {countryData.populationCounts.length ? (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-6">Population Chart:</h3>
          <Chart countryData={countryData} />
        </>
      ) : null}
    </div>
  );
}

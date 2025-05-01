"use client";

import React, { useEffect, useState } from "react";

type WeatherData = {
  temp: number;
};

const WeatherOilSuggestion: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [oilType, setOilType] = useState("");

  

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Lagos&units=metric&appid`
        );
        const data = await res.json();
        const temp = data.main.temp;
        setWeather({ temp });

        if (temp < 0) setOilType("5W-30 Synthetic Oil");
        else if (temp >= 0 && temp <= 25) setOilType("10W-30 Conventional Oil");
        else setOilType("15W-40 Diesel Engine Oil");

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Oil Suggestion Based on Weather</h2>
      {loading ? (
        <i><p>Loading...</p></i>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-gray-700 mb-2">
            Current Temperature: <strong>{weather?.temp}°C</strong>
          </p>
          <p className="text-green-600 font-medium">
            Recommended Oil: <strong>{oilType}</strong>
          </p>
        </>
      )}
    </div>
  );
};

export default WeatherOilSuggestion;

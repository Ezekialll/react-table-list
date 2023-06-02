import React, { useState, useEffect } from "react";
import "./CultureStats.css";

const Stats = () => {
  const [selectedCropValue, setSelectedCropValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ru");
  
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const allCrops = filteredData.map(
    (item) => item[`culture_name_${selectedLanguage}`]
  );

  const handleCropChange = (e) => {
    const cropValue = e.target.value;
    setSelectedCropValue(cropValue);
    if (cropValue === "all") {
      setSelectedCulture("");
    } else {
      setSelectedCulture(cropValue);
    }
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFilteredData(selectedCropValue);
  };

  const fetchFilteredData = (cropValue) => {
    let url = `http://10.118.50.31:8111/gip/culture-statistics/?year=2022&land_type=1&ai=true`;

    if (cropValue !== "all") {
      url += `&culture=${cropValue}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFilteredData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    fetchFilteredData(selectedCropValue);
  }, [selectedCropValue]);

  
  const tableHeaders = {
    ru: ["Урожай", "Область", "Площадь (га)"],
    en: ["Crop", "Region", "Area (ha)"],
    ky: ["түшүм", "Область", "Аймак (га)"]
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label className="label">
            Культура:
            <select
              className="select"
              value={selectedCropValue}
              onChange={handleCropChange}
              disabled={filteredData.length === 0}
            >
              <option value="">Все культуры</option>
              {allCrops.map((item, ind) => (
                <option key={ind} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="label">
            Область:
            <select
              className="select"
              value={selectedRegion}
              onChange={handleRegionChange}
            >
              <option value="">Кыргызстан</option>
              <option value="3">Иссык-Кол</option>
            </select>
          </label>
        </div>

        <div>
          <label className="label">
            Язык:
            <select
              className="select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="ru">Русский</option>
              <option value="en">Английский</option>
              <option value="ky">Кыргызский</option>
            </select>
          </label>
        </div>

        <button type="submit" className="submitButton">
          Применить
        </button>
      </form>

      <table className="table">
        <thead>
          <tr className="tableHeader">
            {tableHeaders[selectedLanguage].map((header, index) => (
              <th key={index} className="tableCell">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData
            .filter(
              (item) =>
                selectedCropValue === "" ||
                item[`culture_name_${selectedLanguage}`] === selectedCropValue
            )
            .map((item, index) => (
              <tr key={index}>
                <td className="tableCell">
                  {item[`culture_name_${selectedLanguage}`]}
                </td>
                <td className="tableCell">
                  {item[`territory_${selectedLanguage}`]}
                </td>
                <td className="tableCell">{item.area_ha}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;

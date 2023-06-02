import React, { useEffect, useState } from "react";
import Table from "./components/todoItem/Table";
import Dropdown from "./components/Dropdown/Dropdown";
import Map from "./components/Map/Map";
import Stats from "./components/cultureStats/cultureStats";



const App = () => {
  const [cultureList, setCultureList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currLang, setCurrLang] = useState("ru");
  const [regions, setRegions] = useState([]);
  

  const fetchUserData = () => {
    setLoading(true);
    fetch("http://10.118.50.31:8111/gip/culture/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCultureList(data);
      })
      .finally(() => setLoading(false));
  };

  function fetchRegions() {
    setLoading(true);
    fetch("http://10.118.50.31:8111/gip/region/?polygon=true")
      .then((response) => response.json())
      .then((res) => setRegions(res))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchUserData();
    fetchRegions();

  }, []);

  if (loading) return "loading...";

  return (
    <div>
      <Dropdown setCurrLang={setCurrLang} currLang={currLang} />
      <Table currLang={currLang} list={cultureList} />
      {regions.length > 0 && <Map regions={regions} />}
      <Stats />
    </div>
  );
};


export default App;

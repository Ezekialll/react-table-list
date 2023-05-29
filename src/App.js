import React, { useEffect, useState } from "react"
import Table from "./components/todoItem/Table";

const App = () => {
  const [cultureList, setCultureList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = () => {
    setLoading(true)
    fetch("http://10.118.50.31:8111/gip/culture/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setCultureList(data);
      }).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  if(loading) return "loading...";

  return (
    <div>
      <Table list={cultureList}/>
    </div>
  );
}

export default App;

import "./App.css";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState("none");
  const [lastData, setLastData] = useState([]);
  const getData = async () => {
    let resp = await axios.get(
      "https://api.coingecko.com/api/v3/exchange_rates"
    );

    let temp = getMultipleRandom(Object.values(resp.data.rates), 3);
    setData(temp);
    setLastData(temp);
    setShow("block");
    setTimeout(() => {
      setShow("none");
    }, 5000);
  };

  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }
  // let chart = data

  return (
    <div className="App">
      <button
        onClick={() => {
          getData();
          // let temp = getMultipleRandom(data, 3)
          // setData(temp)
          console.log(data);
        }}
      >
        click me
      </button>
      <div className="wrapper">
        <div className="chart" style={{ display: show }}>
          {data.length === 0 ? (
            ""
          ) : (
            <>
              <PieChart
                data={[
                  { title: "One", value: data[0].value, color: "#E38627" },
                  { title: "Two", value: data[1].value, color: "#C13C37" },
                  { title: "Three", value: data[2].value, color: "#6A2135" },
                ]}
              />
            </>
          )}
        </div>

        {lastData.length === 0 ? (
              ""
            ) : (
              <div className="table" style={{display: 'block'}}>
                <span>{lastData[0].name} = {lastData[0].value}</span><br />
                <span>{lastData[1].name} = {lastData[1].value}</span><br />
                <span>{lastData[2].name} = {lastData[2].value}</span><br />
                
              </div>
            )}
      </div>
    </div>
  );
}

export default App;

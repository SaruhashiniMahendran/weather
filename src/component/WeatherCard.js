import { useEffect, useState } from "react";
import "../css/WeatherCard.css";
import sunny from "../image/sunny.png";

export function WeatherCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "http://dataservice.accuweather.com/forecasts/v1/daily/1day/40000?apikey=LQnIsWS9nbTXXkqMnAQo7bn3bl8Aq7Le"
    )
      .then((response) => response.json())
      .then((res) => {
        setData(res.DailyForecasts[0]);
        // console.log(new Date(res.DailyForecasts[0].Date).getDay());
        console.log(new Date(res.DailyForecasts[0].Date).getDay());
      });
  }, []);

  const convertFToCTemp = (val) => {
    return ((Number(val) - 32) * (5 / 9)).toFixed(2);
  };

  const makeDateString = (date) => {
    const new_date = new Date(data.Date);
    return `${new_date.getDay()}, ${new_date.getMonth()} ${new_date.getDate()}`;
  };

  function addDays(new_date) {
    var day = new_date.getDay();
    var newDay;
    if (day === 0) {
      newDay = "Sunday";
    } else if (day === 1) {
      newDay = "Monday";
    } else if (day === 2) {
      newDay = "Tuesday";
    } else if (day === 3) {
      newDay = "Wednesday";
    } else if (day === 4) {
      newDay = "Thursday";
    } else if (day === 5) {
      newDay = "Friday";
    } else if (day === 6) {
      newDay = "Sataday";
    }
    return newDay;
  }

  return data === null ? (
    <>Please wait..</>
  ) : (
    <>
      <div className="mainCard">
        <div className="card">
          <div className="cardOne">
            <img src={sunny} alt="" />
          </div>
          <div className="cardTwo">
            <p className="cel">
              {convertFToCTemp(data.Temperature.Maximum.Value)} &#8451;
            </p>
            <p className="weather">{data.Day.IconPhrase}</p>
            <p className="day">{makeDateString(data.Date)}</p>
            {/* <button onClick={() => setCelcious(50)}>change</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

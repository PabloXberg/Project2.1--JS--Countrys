window.onload= ()=> {
 let countryName = getUrlParameter()
  fetchCountry(countryName)
}

  
function getUrlParameter() {
  let params = (new URL(document.location)).searchParams;
const countryName = params.get('name');
const divheader = document.getElementById("countryname-div")
const header = document.getElementById("countryname");
header.innerHTML = countryName;
divheader.appendChild (header);
return countryName
}

const fetchCountry = (countryName) => {

  console.log('countryName :>> ', countryName);
   fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((res) => {
  const fetchedCountry = res[0];
    armarTabla(fetchedCountry)
    addEvents();
})
  .catch((err) => console.log(err));
 }

const armarTabla = (country) => {
  const title = document.getElementById("title");
  const divheader = document.getElementById("countryname-div")
  const header = document.getElementById("countryname");
  header.setAttribute("text-align", "center")
  const imgdiv = document.getElementById("flag-div")
  const flagImg = document.createElement("img");
  const escdiv = document.getElementById("escudo-div")
  const escImg = document.createElement("img");
  const table = document.getElementById("details-table");
  const row = document.createElement("tr");
  row.id = "datarow"
  title.innerHTML = (`Weather for ${country.name.common}`)
   header.innerHTML = country.name.official;
    flagImg.setAttribute("src", country.flags.png);
  flagImg.setAttribute("alt", country.flags.alt);
   escImg.setAttribute("src", country.coatOfArms.png);
  escImg.setAttribute("alt", country.coatOfArms.alt);
   const capital = document.createElement("td");
  capital.innerHTML = country.capital;
  const language = document.createElement("td");
  language.innerHTML = country.demonyms.eng.m;
  const population = document.createElement("td");
  population.innerHTML = country.population;
  const timezone = document.createElement("td");
  timezone.innerHTML = country.timezones;
  const region = document.createElement("td");
  region.innerHTML = country.region;
  const subregion = document.createElement("td");
  subregion.innerHTML = country.subregion;
  table.appendChild(row);
  divheader.appendChild(header);
  imgdiv.append(flagImg);
  escdiv.append(escImg);
  row.append(capital, language, population, timezone, region, subregion);
  getWeatherByCity(capital);

}

const getWeatherByCity = (city) => {
  // hide spinner
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("invisible");
  //show table
  const containerData = document.getElementById("data-to-display");
  containerData.classList.add("invisible");

  setTimeout(() => {
    const capital = city.innerText;
    let urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${capital}&days=7&aqi=no&alerts=no`;
    fetch(urlForecast).then((singleResponse) => {
          return singleResponse.json();
          }).then((result) => {
          const weatherData = result;
          displayData(weatherData);
     });
  }, 1000);
};

const displayData = (weatherData) => {
  // hide spinner
  const spinner = document.getElementById("spinner");
  spinner.classList.add("invisible");
  //show table
  const containerData = document.getElementById("data-to-display");
  containerData.classList.remove("invisible");

  const city = document.getElementById("city");
  const tbody = document.getElementById("weather-data");
  const { forecast, location } = weatherData;

  city.innerText = `Weather for ${location.name} in ${location.country}, for the next week...`;
  createTable(tbody, forecast);
   
};

const createTable = (tbody, forecast) => {
  forecast.forecastday.forEach((day) => {
    
    const row = document.createElement("tr");
    row.id = "weatherrow"
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("td");
    const td8 = document.createElement("td");
    const td9 = document.createElement("td");
    const td10 = document.createElement("img");
    td1.innerText = day.date;
    td2.innerText = `${day.day.mintemp_c} °C`;
    td3.innerText = `${day.day.maxtemp_c} °C`;
    td4.innerText = `${day.day.avghumidity} %`;
    td5.innerText =`${day.day.maxwind_kph} kph`;
    td6.innerText = day.astro.sunrise;
    td7.innerText = day.astro.sunset;
    td8.innerText = day.astro.moonrise;
    td9.innerText = day.astro.moonset;
    td10.setAttribute("src", day.day.condition.icon)
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    row.appendChild(td8);
    row.appendChild(td9);
    row.appendChild(td10);
    tbody.appendChild(row);
  });
};


const cleanDOM = () => {

  document.getElementById("buscador").value = "";
  document.querySelectorAll("img").innerHTML = "";
  document.getElementById("datarow").innerText  = "";
  document.getElementById("flag-div").innerText  = "";
  document.getElementById("escudo-div").innerText = "";
  document.getElementById("weather-data").innerText  = "";
  document.getElementById("city").innerText  = "";

};

//BUSCAR A TRAPES DEL INPUT TEXT

const addEvents = () => {
  let country = "";
  const searchInput = document.getElementById("buscador");
  searchInput.addEventListener("change", (event) => {
    country = event.target.value;

  });

  searchInput.addEventListener("keydown", (event) => {
    event.preventDefault()
    if (event.key === "Enter") {
      cleanDOM();
      fetchCountry(country);
     }
  });
};
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

const fetchCountry =(countryName)=> {
   fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then((res) => {
  const fetchedCountry = res[0];
  armarTabla(fetchedCountry)
})
.catch((err) => console.log(err));
}


const armarTabla = (country)=> {
  console.log('country :>> ', country);
  const title = document.getElementById("title");
  title.innerHTML = (`Details about ${country.name.common}`)
  const divheader = document.getElementById("countryname-div")
  const header = document.getElementById("countryname");
  header.setAttribute("text-align", "center")
  header.innerHTML = country.name.official;
  divheader.appendChild (header);
  const imgdiv = document.getElementById("flag-div")
  const flagImg = document.createElement("img");
  flagImg.setAttribute("src", country.flags.png);
  flagImg.setAttribute("alt", country.flags.alt);
  const escdiv = document.getElementById("escudo-div")
  const escImg = document.createElement("img");
  escImg.setAttribute("src", country.coatOfArms.png);
  escImg.setAttribute("alt", country.coatOfArms.alt);
  imgdiv.append(flagImg);
  escdiv.append(escImg);
  const table = document.getElementById("details-table");

  const row = document.createElement("tr");
  table.appendChild(row);

  const capital = document.createElement("td");
  capital.innerHTML = country.capital;
  
  const language = document.createElement("td");
  language.innerHTML = country.demonyms.eng.m;
  const population = document.createElement("td");
  population.innerHTML = country.population;
  const timezone = document.createElement("td");
  timezone.innerHTML = country.timezones;
;
  const region = document.createElement("td");
  region.innerHTML = country.region;

  const subregion = document.createElement("td");
  subregion.innerHTML = country.subregion;
  row.append(capital, language, population, timezone, region, subregion);
  getWeatherByCity(capital);

  // const maindiv = document.getElementById("main-div");                                    tryed to put a googlemap, but didn't work, cause the API isn't good made...
  // const map = document.createElement("iframe");
  // const lati = country.latlng[0];
  // const longi = country.latlng[1];
  // console.log('lati :>> ', lati);
  // console.log('longi :>> ', longi);
  // const url = "https://www.google.com/maps?q=" + lati + "," + longi + "&hl=es-PY&gl=py&shorturl=1";
  // map.setAttribute("src",url );
  // console.log('url :>> ', url);
  // maindiv.append(map);

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
    console.log('capital>> ', capital);
    
    let urlAstronomy = `http://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${capital}&dt=${new Date()}`;
    let urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${capital}&days=5&aqi=no&alerts=no`;

    let urlsArray = [urlAstronomy, urlForecast];

    Promise.all(
      urlsArray.map((singleUrl) => {
        return fetch(singleUrl).then((singleResponse) => {
          // console.log("singleResponse", singleResponse);
          return singleResponse.json();
        });
      })
    ).then((result) => {
      console.log("result", result);
      const astronomyData = result[0];
      const weatherData = result[1];
      console.log('astronomyData :> ', astronomyData);
console.log('weatherData :>> ', weatherData);
      displayData(weatherData, astronomyData);
      // addEvents();
    });
  }, 1000);
};

const displayData = (weatherData, astronomyData) => {
  // hide spinner
  const spinner = document.getElementById("spinner");
  spinner.classList.add("invisible");
  //show table
  const containerData = document.getElementById("data-to-display");
  containerData.classList.remove("invisible");

  const city = document.getElementById("city");
  const tbody = document.getElementById("weather-data");
  const astronomyCards = document.getElementById("astronomy-cards");

  // cleanDOM(city, tbody, astronomyCards);

  const { forecast, location } = weatherData;

  city.innerText = `Diplaying the weather for ${location.name} in ${location.country}`;
  const { astronomy } = astronomyData;

  createAstronomyCards(astronomyCards, astronomy);
  createTable(tbody, forecast);
};

const createTable = (tbody, forecast) => {
  forecast.forecastday.forEach((day) => {
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td1.innerText = day.date;
    td2.innerText = day.day.mintemp_c;
    td3.innerText = day.day.maxtemp_c;
    td4.innerText = day.day.condition.text;
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    tbody.appendChild(row);
  });
};

const createAstronomyCards = (astronomyCards, astronomy) => {
  const divSun = document.createElement("div");
  divSun.setAttribute("class", "card ");
  const divSunBody = document.createElement("div");
  divSunBody.setAttribute("class", "card-body");
  const h5Sun = document.createElement("h5");
  h5Sun.setAttribute("class", "card-title");
  h5Sun.innerText = "Sun";
  const ulSun = document.createElement("ul");
  ulSun.setAttribute("class", "list-group list-group-flush");
  const ulSunRise = document.createElement("li");
  ulSunRise.setAttribute("class", "list-group-item");
  ulSunRise.innerText = `Sunrise is at ${astronomy.astro.sunrise}`;
  const ulSunSet = document.createElement("li");
  ulSunSet.setAttribute("class", "list-group-item");
  ulSunSet.innerText = `Sunset is at ${astronomy.astro.sunset}`;
  ulSun.appendChild(ulSunRise);
  ulSun.appendChild(ulSunSet);
  divSunBody.appendChild(h5Sun);
  divSun.appendChild(divSunBody);
  divSun.appendChild(ulSun);
  astronomyCards.appendChild(divSun);
};


const cleanDOM = (city, tbody, astronomyCards) => {
  city.innerHTML = "";
  tbody.innerHTML = "";
  astronomyCards.innerHTML = "";
  document.getElementById("city-search").value = "";
};

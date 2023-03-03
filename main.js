function getCountries () {
  fetch("https://restcountries.com/v3.1/all")
  .then(function(response) {
    // console.log("response: ", response);
    return response.json();
  })
  .then(function(result) {
    ShowTable(result);
    search(result);
  })
  .catch(function(error) {
    console.log(error);
    alert(error);
  })
}
getCountries();


const ShowTable = (countries) => {
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  countries.forEach((country) => {
     
    console.log("countries:", countries[1].region);

    const row = document.createElement("tr");
    table.appendChild(row);
    const nameCell = document.createElement("td");
    nameCell.innerHTML = country.name.common;
    const aufDeuCell = document.createElement("td");
    aufDeuCell.innerHTML = country.translations.deu.common;
    const popCell = document.createElement("td");
    popCell.innerHTML = country.population;
    const capitalCell = document.createElement("td");
    capitalCell.innerHTML = country.capital;
    const flagCell =  document.createElement("td");
    flagCell.setAttribute("style", "text-align: center")

    const flagImg = document.createElement("img");
    flagImg.setAttribute("src", country.flags.png);
    flagImg.setAttribute("alt", country.flags.alt);

    flagCell.appendChild(flagImg);

    const linkCell = document.createElement("td");
    const link = document.createElement("a");
    link.setAttribute("href", `details.html?name=${country.name.common}`);
    link.innerHTML = "see more..";
    linkCell.appendChild(link)

    row.append(nameCell, aufDeuCell, popCell, capitalCell, flagCell, linkCell);
    })
  }


  const search = (countries) => {
    let city = "";
    const searchInput = document.getElementById("buscador");
      searchInput.addEventListener("input", (event) => {
      city = event.target.value;
    });
    searchInput.addEventListener("keydown", (event) => {
      console.log("key event", event);
      if (event.key === "Enter") {
        fetchCountry(city);
        console.log('city :>> ', city);
         // AL PRECIONAR ENTER; REDIRECCIONAR A details.html Y MOSTRAR DETALLES DEL PAIS
        // console.log("do something");
       // getWeatherByCity(city);
      }
    });
  };
  

//   const fetchCountry =(countryName)=> {
//     fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
//  .then((res) => res.json())
//  .then((res) => {
//    const fetchedCountry = res[0];
//    ShowCountry(fetchedCountry);
//    console.log('fetchedCountry :>> ', fetchedCountry);
//  })
//  .catch((err) => console.log(err));
//  }


  // const ShowCountry = (country) => {
  //   console.log('country :>> ', country);
  //   const table = document.querySelector("tbody");
  //   table.innerHTML = "";
  //   console.log("countries:", country[1].name.common);
  //   const row = document.createElement("tr");
  //   table.appendChild(row);
  //   const nameCell = document.createElement("td");
  //   nameCell.innerHTML = country.name.common;
  //   const aufDeuCell = document.createElement("td");
  //   aufDeuCell.innerHTML = country.translations.deu.common;
  //   const popCell = document.createElement("td");
  //   popCell.innerHTML = country.population;
  //   const capitalCell = document.createElement("td");
  //   capitalCell.innerHTML = country.capital;
  //   const flagCell =  document.createElement("td");
  //   flagCell.setAttribute("style", "text-align: center")
  
  //   const flagImg = document.createElement("img");
  //   flagImg.setAttribute("src", country.flags.png);
  //   flagImg.setAttribute("alt", country.flags.alt);
  
  //   flagCell.appendChild(flagImg);
  
  //   const linkCell = document.createElement("td");
  //   const link = document.createElement("a");
  //   link.setAttribute("href", `details.html?name=${country.name.common}`);
  //   link.innerHTML = "see more..";
  //   linkCell.appendChild(link)
  
  //     row.append(nameCell, aufDeuCell, popCell, capitalCell, flagCell, linkCell);
  // }
    
const fetchData = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      return res.json()
    })
    .then((fetchResult) => {
addEvents
      controllerFunction(fetchResult);
    })
    .catch((error) => console.log(error));

  }
  
  fetchData();
 
 
const controllerFunction = (countries) => {
      buildTable(countries);
      RegionOptions(countries);
      SubRegionOptions(countries)
      addEventListeners(countries);
      addEventListeners2(countries);
      addEvents();
    }
  

 // ---------------------------------------------------------------------------------------CARGA LAS OPCIONES DEL SELECT DE LAS "REGIONES"
const RegionOptions = (countries) => {
  
    const compsOptions = document.getElementById("Region");
    const compNames = countries.map((country) => {
      return country.region
    })
    const set = new Set(compNames);
    const uniqueRegion = [...set];
      uniqueRegion.forEach((country) => {
      const option = document.createElement("option");
      option.setAttribute("value", country);
      option.innerHTML = country;
      compsOptions.append(option);
    })


  }
const SubRegionOptions = (countries) => {
    const compsOptions = document.getElementById("SubRegion");
    compsOptions.textContent =""
    const compNames = countries.map((country) => {
      return country.subregion
    })
    const option = document.createElement("option");
    option.setAttribute("value", "all");
    option.textContent = "Select Subregion...";
    compsOptions.append(option);
    const set = new Set(compNames);
    const uniqueRegion = [...set];
      uniqueRegion.forEach((country) => {
    
      const option = document.createElement("option");
      option.setAttribute("value", country);
      option.textContent = country;
      compsOptions.append(option);
    })
  }
//--------------------------------------------------------------------------------------ESCUCHA LOS CAMBIOS DEL SELECT. REGIONES
  const addEventListeners = (countries) => {
    const RegionOptions = document.getElementById("Region");
   
    RegionOptions.addEventListener("change", (event) => {
        filterByRegion(countries)

    })
}

const filterByRegion =(countries)=> {
  const selectedOption = document.getElementById("Region").value;

  if (selectedOption === "all") {
    buildTable(countries)
  } else {
    const filteredCountries = countries.filter((country) => {
    return country.region === selectedOption
   })
    
      buildTable(filteredCountries);
      SubRegionOptions(filteredCountries)

  }
}
const filterBySubRegion =(countries)=> {
  const selectedOption = document.getElementById("SubRegion").value;

  if (selectedOption === "all") {
    buildTable(countries)
  } else {
    const filteredCountries = countries.filter((country) => {
    return country.subregion === selectedOption
   })
    
      buildTable(filteredCountries);

  }
}

//--------------------------------------------------------------------------------------ESCUCHA LOS CAMBIOS DEL SELECT. SUBREGIONES

const addEventListeners2 = (countries) => {
  const SubRegionOptions = document.getElementById("SubRegion");
 
    SubRegionOptions.addEventListener("change", (event) => {
      filterBySubRegion(countries)
   
  })
}


    // ---------------------------------------------------------------------------------------ARMA LA TABLA --------------------------------------------------
  const buildTable = (Countries) => {
      const CountryTable = document.getElementById("countries-table");
      CountryTable.innerHTML = "";
      Countries.forEach((country) => {


        const row = document.createElement("tr");
        CountryTable.appendChild(row);
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

//BUSCAR A TRAVES DEL INPUT TEXT

const addEvents = () => {
  let country = "";

  const searchInput = document.getElementById("buscador");
  searchInput.addEventListener("input", (event) => {
    country = event.target.value;

  });
  searchInput.addEventListener("keydown", (event) => {
    console.log("key event", event);
    if (event.key === "Enter") {
      fetchCountry(country);
      // window.location.href = `details.html?name=${country}`

    }
  });
    const buttonsearch = document.getElementById("searchbutton")
    buttonsearch.addEventListener("onclick", (event) => {
      fetchCountry(country);

          // window.location.href = `details.html?name=${country}`

  });
}

const fetchCountry = (countryName) => {
  console.log('countryName :>> ', countryName);
   fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((res) => {
  const fetchedCountry = res[0];
  console.log('fetchedCountry :>> ', fetchedCountry);
  
  buildTable(fetchedCountry);
})
.catch((err) => console.log(err));

}
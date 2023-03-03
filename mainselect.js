const fetchData = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      return res.json()
    })
    .then((fetchResult) => {
      console.log("fetch result: ", fetchResult);
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
  // console.log('countries :>> ', countries);
    const compsOptions = document.getElementById("SubRegion");
    compsOptions.textContent =""
    const compNames = countries.map((country) => {
      return country.subregion
    })
    // console.log('compNames :>> ', compNames);
    const set = new Set(compNames);
    const uniqueRegion = [...set];
    console.log('uniqueRegion :>> ', uniqueRegion);

      uniqueRegion.forEach((country) => {
        console.log('country :>> ', country);
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
      // console.log(event.target.value);
     
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


//   // ---------------------------------------------------------------------------------------CARGA LAS OPCIONES DEL SELECT DE LAS "SUBREGIONES"
//   const SubRegionOptions = (regiones) => {
//     const RegionOptions = document.getElementById("Region");
//     const SubRegionOptions = document.getElementById("SubRegion");
//     console.log("regiones:", regiones);
//     const compNames = regiones.country.region.map((region) => {
//     return region.subregion
  

//     })
//     if ((RegionOptions.value !== "all") && (regiones.subregion === RegionOptions.value)){
    

//             const set = new Set(compNames);
//             const uniqueComps = [...set];
//             uniqueComps.forEach((subregion) => {
//             const option = document.createElement("option");
//             option.setAttribute("value", subregion);
//             SubRegionOptions.append(option);
//     }) 
//     }
//   }
//--------------------------------------------------------------------------------------ESCUCHA LOS CAMBIOS DEL SELECT. SUBREGIONES

//   const addEventListenersforSub = (Regiones) => {
//     const SubRegionOptions = document.getElementById("SubRegion");
//     SubRegionOptions.addEventListener("change", (event) => {
//       // console.log(event.target.value);
//       if (event.target.value === "all") {
//         buildTable(Regiones)
//       } else {
//         const FilteredRegiones = Regiones.filter((subregion) => {
//           return subregion.subregion === event.target.value;
//         })
//         // console.log(filteredGames);
//         buildTable(FilteredRegiones);
//       }
//     })
// }


    // ---------------------------------------------------------------------------------------ARMA LA TABLA --------------------------------------------------
  const buildTable = (Countries) => {
      const CountryTable = document.getElementById("countries-table");
      CountryTable.innerHTML = "";
      Countries.forEach((country) => {
        console.log("Region:", Countries[1].region);

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
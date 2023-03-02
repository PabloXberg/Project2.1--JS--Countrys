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
//--------------------------------------------------------------------------------------ESCUCHA LOS CAMBIOS DEL SELECT. REGIONES
  const addEventListeners = (countries) => {
    const RegionOptions = document.getElementById("Region");
   
    RegionOptions.addEventListener("change", (event) => {
        
      // console.log(event.target.value);
      if (event.target.value === "all") {
        buildTable(countries)
      } else {
        const filteredCountries = countries.filter((country) => {
        return country.region === event.target.value;
       })
        
        // console.log("filteredCountries: ", filteredCountries);
        // const subregiones = filteredCountries.map((subregion) =>{
        // })
        // console.log ("subregiones: ", subregiones)

          buildTable(filteredCountries);
    //    SubRegionOptions(subregiones)
      }
    })
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
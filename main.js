function getCountries () {
  fetch("https://restcountries.com/v3.1/all")
  .then(function(response) {
    // console.log("response: ", response);
    return response.json();
  })
  .then(function(result) {
    // console.log("result: ", result);
    // console.log (region);

    ShowTable(result);
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




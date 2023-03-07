//----------------------------------------------------------Create cards-------------------------------------------

function getCountries () {
    fetch("https://restcountries.com/v3.1/all")
    .then(function(response) {
      console.log("response: ", response);
      return response.json();
    })
    .then(function(result) {
      console.log("result: ", result);
      CreateCards(result);
        addEventListeners(result);
    })
    .catch(function(error) {
      console.log(error)
      alert(error);
    })
  }
getCountries();

function CreateCards(array) {     
  const cardsDiv = document.getElementById("cards-container");
  cardsDiv.innerHTML = "";

    for (let i = 0; i < array.length; i++) {

        const card = document.createElement("div");
        cardsDiv.classList.add("col", "row-cols-1", "row-cols-md-3", "g-4")
        card.classList.add("card", "col-lg");
        card.setAttribute("style", "width: 13rem;");
        cardsDiv.appendChild(card);
        const img = document.createElement("img");
        img.setAttribute("src", array[i].flags.png);
        img.setAttribute("alt", array[i].flags.alt);
        img.setAttribute("style", "card-img-top");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.append(img, cardBody);
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerHTML = array[i].name.common;
        const cardcapital = document.createElement("p");
        cardcapital.classList.add("card-text");
        cardcapital.innerHTML = array[i].capital;
        cardBody.append(title, cardcapital);
        const button = document.createElement("button");
        button.classList.add ("btn-primary");
        button.classList.add ("btn");
        button.innerHTML = "Show More";
        cardBody.append(button);


        button.addEventListener("click", function(e) {
            // e.stopPropagation();
   
            if ( button.innerHTML === "Show More" ) {
                const list = document.createElement ("ul");
                const cardlenguage = document.createElement("li");
                const cardpop = document.createElement("li");
                cardlenguage.innerHTML = array[i].language;
              
                cardpop.innerHTML = array[i].population;
                list.classlist = ("list-group list-group-flush");
                cardlenguage.classList = ("list-group-item");
                cardpop.classList = ("list-group-item");
                cardlenguage.id =("cardlang");
                cardpop.id =("cardpopo");
                cardBody.append (cardlenguage, cardpop);
                button.innerHTML = "Show Less";
                              
            } else  {
                const cardlenguages = document.getElementById ("cardlang");
                const cardpopi = document.getElementById ("cardpopo");
                cardlenguages.innerHTML = "";
                cardpopi.innerHTML = "";
                cardBody.append (cardlenguages, cardpopi);
                button.innerHTML = "Show More";
                        
            }
          });
    }
  }
  

const addEventListeners = (countries) => {
  // const subregionsOptions = document.getElementById("subregions");

  // subregionsOptions.addEventListener("change", (e) => {
  //   // console.log("region", e.target.value);
  //   // filterBySubregion(countries);
  //   // combinedFilters(countries);
  //   displayTable(countries);
  // });

  // const regionsOptions = document.getElementById("regions");

  // regionsOptions.addEventListener("change", (e) => {
  //   // console.log("subregion", e.target.value);
  //   // filterByRegion(countries);
  //   // combinedFilters(countries);
  //   displayTable(countries);
  // });

  const checkBoxes = document.querySelectorAll("input[type='checkbox']");
  console.log("checkBoxes", checkBoxes);

  checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      // console.log("working")
      // combinedFilters(countries);

      filterByCheckbox(countries)
    });
  });
};



const filterByCheckbox = (countries) => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");

  console.log("checkboxes inside FilterFunc", checkboxes);

  const checkboxesValues = Array.from(checkboxes).map((checkbox) => {
    return checkbox.value;
  });
  console.log("checkboxesValues", checkboxesValues);

  const filteredCountries = countries.filter((country) => {
    return (
      checkboxesValues.includes(country.region) ||
      checkboxesValues.length === 0
    );
  });
  console.log('filteredCountries :>> ', filteredCountries);
  CreateCards(filteredCountries);
};


// const cleanDOM = (city, tbody, astronomyCards) => {
//   city.innerHTML = "";
//   tbody.innerHTML = "";
//   astronomyCards.innerHTML = "";
//   document.getElementById("city-search").value = "";
// };

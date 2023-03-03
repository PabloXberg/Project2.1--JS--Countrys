console.log("testing")



window.onload= ()=> {
 let countryName = getUrlParameter()
  fetchCountry(countryName)
}
function getUrlParameter() {
  let params = (new URL(document.location)).searchParams;
const countryName = params.get('name');
console.log(countryName);
const divheader = document.getElementById("header-div")
const header = document.getElementById("detailsheader");
header.innerHTML = `Detalles sobre ${countryName}`;
divheader.appendChild (header);
return countryName
}

const fetchCountry =(countryName)=> {
   fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then((res) => {
  console.log(res);
  const fetchedCountry = res[0];
  console.log("fetched country: ", fetchedCountry);
  armarTabla(fetchedCountry)
  pais = fetchedCountry.name.common;
  console.log("pais: ",pais);
})
.catch((err) => console.log(err));
}


const armarTabla = (country)=> {
console.log('country :>> ', country);
}


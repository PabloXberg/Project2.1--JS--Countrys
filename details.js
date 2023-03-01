console.log("testing")

let params = (new URL(document.location)).searchParams;
let name = params.get('name');
console.log(name);

fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
.then((res) => res.json())
.then((res) => {
  console.log(res);
  const fetchedCountry = res[0];
  console.log("fetched country: ", fetchedCountry);
})
.catch((err) => console.log(err));
// Skapar variabler som innehåller API:ets endpoints
const urlA = "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
const urlB = "https://www.themealdb.com/api/json/v1/1/search.php?f=b"

// Skapar async-funktion som ska hämta ut datan
async function fetchMeals(){
  // Hämtar datan med fetch(), när datan hämtats (await) sparas den i variabeln response
  const response = await fetch(urlA);
  // Omvandlar datan i response till JSON-objekt, när datan omvandlars (await) sparas den i variabeln data
  const data = await response.json();
  // Returnerar datan
  return data;
}

// Skapar ny async-funktion som hämtar datan från fetchMeals så att jag kan jobba med den
async function mealData() {
  // Sparar datan från fetchMeals() i objektet data när fetchMeals jobbat klart (await)
  const data = await fetchMeals();
  // console loggar all data från måltider i objektet data
  // console.log("Alla måltider: ", data.meals);
  // console loggar namnet (strMeal) från första måltiden [0] i objektet data
  //console.log("Första måltiden i objektet: ", data.meals[0].strMeal);
  // console loggar 5 första namnen på måltider i alfabetisk ordning
  const fiveMeals = [];
  for (let i = 0; i < 3; i++) {
    fiveMeals.push(data.meals[i].strMeal);
  }
  console.log(fiveMeals);
}

mealData();




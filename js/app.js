// Skapar async-funktion som ska hämta ut datan
async function fetchMeals(){
  // Skapar lista med två av API:ets endpoints för måltider som börjar på A och B
  const urls = [ "https://www.themealdb.com/api/json/v1/1/search.php?f=a",
    "https://www.themealdb.com/api/json/v1/1/search.php?f=b"]
  // Använder Promice.all för att hämta båda endpoints samtidigt
  // Hämtar datan med fetch(), när datan hämtats (await) sparas den i variabeln responses
  const responses = await Promise.all(urls.map(url => fetch(url)));
  // Omvandlar datan i responses till JSON-objekt, när datan omvandlats (await Promise.all) sparas den i variabeln data
  const data = await Promise.all(responses.map(res => res.json()));
  // Plockar ut måltiderna från båda och slår ihop dem i en lista med flat.Map
  // ?? [] skyddar mot null om en endpoint inte skulle ha några måltider, ersätts då med tom array
  const allMeals = data.flatMap(d => d.meals ?? []);
  // Returnerar datan
  return allMeals;
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




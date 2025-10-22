
// Skapar async-funktion som ska få ut alla måltider genom att hämta data från flera endpoints
async function fetchMeals(){
  // Spara alla bokstäver i en lista alphabet och bas-endpoint i baseURL
  const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
  const baseUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
  // Sätter ihop dem i ny lista urls med .map()
  const urls = alphabet.map((letter) => baseUrl + letter);
  // Använder Promise.all för att hämta alla endpoints samtidigt
  // Hämtar datan med fetch(), när datan hämtats (await) sparas den i nya objektet responses
  const responses = await Promise.all(urls.map(url => fetch(url)));
  // Omvandlar datan i responses till nya JSON-objekt, när datan omvandlats (await Promise.all) sparas den i objektet data
  const data = await Promise.all(responses.map(res => res.json()));
  // Plockar ut måltiderna från alla objekt och slår ihop dem i en lista med flat.Map
  // ?? [] skyddar mot null om en endpoint inte skulle ha några måltider, ersätts då med tom array
  const allMeals = data.flatMap(d => d.meals ?? []);
  // Returnerar datan
  return allMeals;
}

// UPPGIFT 1: Print the first 5 names of the meals in alphabetical order


// Skapar ny async-funktion som hämtar datan från fetchMeals så att jag kan jobba med den
async function mealData() {
  // Sparar datan från fetchMeals() i objektet allMeals när fetchMeals jobbat klart (await)
  const allMeals = await fetchMeals();

  // TEST: console loggar all data från måltider i objektet allMeals
  //console.log("Alla måltider: ", allMeals);
  // TEST: console loggar namnet (strMeal) från första måltiden [0] i objektet allMeals
  //console.log("Första måltiden i objektet: ", allMeals[0].strMeal);

  // Sorterar måltider efter namn och sparar dem i objekt sorted
  const sorted = allMeals.sort((a,b) => a.strMeal.localeCompare(b.strMeal));
  // Plockar ut de fem första måltidernas namn i en lista med hjälp av .slice() och .map()
  const firstFive = sorted.slice(0,5).map(meal => meal.strMeal);

  console.log(firstFive);
}

mealData();


// UPPGIFT 2: Print all meals that contain a given category


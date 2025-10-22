
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

// Nu gör vi grejer med datan!

// Skapar ny async-funktion som hämtar datan från fetchMeals så att jag kan jobba med den
async function mealData() {
  // Sparar datan från fetchMeals() i objektet allMeals när fetchMeals jobbat klart (await)
  const allMeals = await fetchMeals();
  console.log("Totalt antal måltider: " + allMeals.length);

  // TEST: console loggar all data från måltider i objektet allMeals
  //console.log("Alla måltider: ", allMeals);
  // TEST: console loggar namnet (strMeal) från första måltiden [0] i objektet allMeals
  //console.log("Första måltiden i objektet: ", allMeals[0].strMeal);

  // Sorterar måltider efter namn och sparar dem i objekt sorted
  const sorted = allMeals.sort((a,b) => a.strMeal.localeCompare(b.strMeal));
  // Plockar ut de fem första måltidernas namn i en lista med hjälp av .slice() och .map()
  const firstFive = sorted.slice(0,5).map(meal => meal.strMeal);

  console.log("Första fem måltiderna: " + firstFive);
  console.log("Första måltidens kategori: ", allMeals[0].strCategory);

  // Loggar alla måltider (namn och kategori) som tillhör kategorin Vegan
  const myCategory = "Vegan".toLowerCase();
  // Skapar ny lista med de måltider som matchar min valda kategori, med metoden .filter()
  const filteredMeals = allMeals.filter(meal => meal.strCategory.toLowerCase() === myCategory);
  console.log("Alla måltider i kategorin Vegan:");
  // Går igenom listan filtered.Meals och skriver ut namnet och kategorin för varje objekt i listan
  filteredMeals.forEach(meal => {
    console.log(`Måltid: ${meal.strMeal} – ${meal.strCategory}`)
  })

  // Skapar ett tomt objekt som ska innehålla antal måltider per kategori i key value-pairs
  const countsByCategory = {};

  // loopar igenom alla måltider i all meals
  for (const meal of allMeals) {
    // sparar varje strCategory i variabel category - finns ingen kategori sätts kategorin "Okänd"
    const category = meal.strCategory ?? "Okänd";
    // strCategory läggs som key i countsByCategory, valuet ökar med ett varje gång kategorin syns i loopen
    countsByCategory[category] = (countsByCategory[category] || 0) + 1;
  }
  console.log("Antal måltider per kategori:");
  console.log(countsByCategory);
}

mealData();

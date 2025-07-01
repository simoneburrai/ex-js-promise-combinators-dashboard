// Scrivere una funzione asincrona getDashboardData(query) che:

// Accetta una query (nome di una città).
// Recupera in parallelo:
// Nome completo della città e paese da /destinations?search=[query]
// Meteo attuale da /weathers?search=[query]
// Nome dell’aeroporto principale da /airports?search=[query]
// Restituisce un oggetto aggregato con le seguenti proprietà:
// city
// country
// temperature
// weather
// airport
// Stampa i dati in console in un messaggio ben formattato.
// 🔧 Specifiche Tecniche
// Utilizza Promise.allSettled() per eseguire le tre richieste in parallelo.
// Per ogni risposta, utilizza solo il primo elemento dell’array restituito.
// Se una delle risposte fallisce o restituisce un array vuoto, imposta i dati relativi a null.
const apiUrl = "http://localhost:3333"
const destinationQuerySearch = "/destinations?search="
const weatherQuerySearch = "/weathers?search="
const airportQuerySearch = "/airports?search="

async function getDashboardData(query){
    const data = {
        city: "",
        country: "",
        weather: "",
        temperature: "",
        airport: ""
    }

    let destinations= [];
    let weathers = [];
    let airports= [];
    let allPromises;
    console.log("AVVIANDO LA FUNZIONE GETDASHBOARD DATA")
    const destinationResponse = fetch(`${apiUrl}${destinationQuerySearch}${query}`).then(res=> res.json());
    const weatherResponse = fetch(`${apiUrl}${weatherQuerySearch}${query}`).then(res=> res.json());
    const airportResponse = fetch(`${apiUrl}${airportQuerySearch}${query}`).then(res=> res.json());
    try {
        allPromises = Promise.allSettled([destinationResponse, weatherResponse, airportResponse])
    }catch{
        throw new Error("Problema nel catturamento dati dashboard")
    }
    
    const allResponses =  (await allPromises).map(promise => {
            if(promise.status === "fulfilled"){
                return promise.value
            }else{
                return null
            }
    
    });

    destinations = allResponses[0];
    weathers = allResponses[1];
    airports = allResponses[2];
    
    return {
        ...data,
        city: destinations[0].name ? destinations[0].name : null,
        country: destinations[0].country ? destinations[0].country : null,
        weather: weathers[0].weather_description ? weathers[0].weather_description : null,
        temperature: weathers[0].temperature ? weathers[0].temperature : null,
        airport: airports[0].name ? airports[0].name : null
    }
}


getDashboardData("london")
.then(res=> {
    console.log(`
    ${res.city} is in ${res.country}.
Today there are ${res.temperature} degrees and the weather is ${res.weather}.
The main airport is ${res.airport}.`)
})
.catch(err=> console.error(err))
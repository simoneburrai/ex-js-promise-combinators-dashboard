# DASHBOARD DELLA CITTA'

In questo esercizio, imparerai a utilizzare `Promise.allSettled()` per creare una funzione asincrona `getDashboardData(query)` che recupera simultaneamente informazioni da tre diverse fonti dati relative a una città specificata.

## 🎯 Obiettivo

Scrivere una funzione asincrona `getDashboardData(query)` che:
- Accetta una **query** (nome di una città).
- Recupera in parallelo:
  1. Nome completo della città e paese da `/destinations?search=[query]`
  2. Meteo attuale da `/weathers?search=[query]`
  3. Nome dell’aeroporto principale da `/airports?search=[query]`
- Restituisce un oggetto aggregato con le seguenti proprietà:
  - `city`
  - `country`
  - `temperature`
  - `weather`
  - `airport`
- Stampa i dati in console in un messaggio ben formattato.

## 🔧 Specifiche Tecniche

- Utilizza `Promise.allSettled()` per eseguire le tre richieste in parallelo.
- Per ogni risposta, utilizza **solo il primo elemento dell’array** restituito.
- Se una delle risposte fallisce o restituisce un array vuoto, imposta i dati relativi a `null`.

## ✅ Esempio di utilizzo

```js
getDashboardData('london')
  .then(data => {
    console.log('Dashboard data:', data);
    console.log(
      `${data.city} is in ${data.country}.
` +
      (data.temperature !== null && data.weather !== null
        ? `Today there are ${data.temperature} degrees and the weather is ${data.weather}.
`
        : ''
      ) +
      (data.airport ? `The main airport is ${data.airport}.
` : '')
    );
  })
  .catch(error => console.error(error));
```

### Output atteso (query: `london`)
**Risposta API:**
```json
{
  "city": "London",
  "country": "United Kingdom",
  "temperature": 18,
  "weather": "Partly cloudy",
  "airport": "London Heathrow Airport"
}
```

**Output in console:**
```
London is in United Kingdom.
Today there are 18 degrees and the weather is Partly cloudy.
The main airport is London Heathrow Airport.
```

---

## 🎯 Bonus 1 - Gestione risultato vuoto

Se una chiamata API restituisce un **array vuoto**, imposta i relativi dati a `null` e **non stampare la frase** corrispondente in console.

### Test: `getDashboardData('vienna')`

**Risposta API:**
```json
{
  "city": "Vienna",
  "country": "Austria",
  "temperature": null,
  "weather": null,
  "airport": "Vienna International Airport"
}
```

**Output in console:**
```
Vienna is in Austria.
The main airport is Vienna International Airport.
```

---

## 🎯 Bonus 2 - Gestione chiamate fallite

Modifica la funzione per usare `Promise.allSettled()` invece di `Promise.all()`:

- Se una chiamata **fallisce** (es. URL errato), i dati relativi vengono impostati a `null`.
- Stampa un messaggio di errore in console per ogni richiesta fallita.

### Test: meteo con link fittizio

```js
// Esempio chiamata fallita
fetch("https://www.meteofittizio.it?search=london")
// produce un errore => catch individuale nella promise
```

**Console:**
```
❌ Errore durante il recupero del meteo: TypeError: Failed to fetch
```

---

## 🧪 Suggerimento per i test

Prova la funzione con diverse query:
- ✅ `getDashboardData('london')` → tutti i dati disponibili
- ⚠️ `getDashboardData('vienna')` → meteo mancante
- ❌ `getDashboardData('paris')` con URL meteo sbagliato → meteo fallito

---

## 📁 File consigliati

- `main.js` → contiene la funzione `getDashboardData()`
- `README.md` → questo file

---

## 💡 Suggerimento finale

Per garantire una buona UX e robustezza del codice:
- Usa `try/catch` se necessario dentro i `then` delle singole promise.
- Verifica se gli array hanno almeno un elemento.
- Crea helper functions per evitare ripetizioni (es. estrazione del primo risultato).

Buon codice! 🚀

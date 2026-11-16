# Post di JSONPlaceholder

App Angular che legge e crea i **post** di [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
con `HttpClient`.

## Che cosa fa

- **Servizio** `PostService` (`src/app/services/post-service.ts`): legge l'elenco (`GET /posts`),
  il singolo post (`GET /posts/:id`) e ne crea di nuovi (`POST /posts`). I dati stanno in signal
  privati esposti in sola lettura con `asReadonly()`.
- **Pagina elenco** `/posts`: filtro per titolo e conteggio dei post trovati calcolati con
  `computed`, più il modulo per creare un nuovo post.
- **Pagina di dettaglio** `/posts/:id`: mostra il post con i pulsanti «Precedente» e «Successivo».
- **Caricamento ed errori**: uno spinner durante le richieste e messaggi diversi per l'elemento
  inesistente (stato 404) e per la rete assente (stato 0).

JSONPlaceholder è un'API di prova: alla `POST` risponde `201 Created` con `id: 101`, ma non salva
nulla. Per questo il post creato non compare nell'elenco e `/posts/101` risponde 404.

## Come si avvia

```bash
npm install
```

```bash
npx ng serve
```

Poi apri `http://localhost:4200/`.

## Come si compila

```bash
npx ng build
```

## Come provare gli errori

- **404**: apri `http://localhost:4200/posts/999`, oppure premi «Successivo» dal post n. 100.
- **Rete assente**: negli strumenti per sviluppatori (F12), scheda **Network**, scegli **Offline**
  e ricarica l'elenco o cambia post.

import { Service, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../modelli/post';

@Service()
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Stato privato: solo il servizio può modificarlo
  private readonly _posts = signal<Post[]>([]);
  private readonly _post = signal<Post | null>(null);
  private readonly _creato = signal<Post | null>(null);
  private readonly _loading = signal(false);
  private readonly _errore = signal<string | null>(null);

  // Stato pubblico in sola lettura: i componenti possono solo leggerlo
  readonly posts = this._posts.asReadonly();
  readonly post = this._post.asReadonly();
  readonly creato = this._creato.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly errore = this._errore.asReadonly();

  // GET /posts: legge l'elenco
  caricaPosts(): void {
    this.inizia();
    this.http.get<Post[]>(this.baseUrl).subscribe({
      next: (dati) => {
        this._posts.set(dati);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  // GET /posts/:id: legge il singolo elemento
  caricaPost(id: number): void {
    this.inizia();
    this._post.set(null);
    this.http.get<Post>(`${this.baseUrl}/${id}`).subscribe({
      next: (dato) => {
        this._post.set(dato);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  // POST /posts: crea un nuovo elemento (l'id lo assegna il server)
  aggiungiPost(nuovo: Omit<Post, 'id'>): void {
    this.inizia();
    this._creato.set(null);
    this.http.post<Post>(this.baseUrl, nuovo).subscribe({
      next: (risposta) => {
        this._creato.set(risposta);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  // Prima di ogni richiesta: accende il caricamento e cancella il vecchio errore
  private inizia(): void {
    this._loading.set(true);
    this._errore.set(null);
  }

  // Se la richiesta fallisce: salva il messaggio e spegne il caricamento
  private gestisciErrore(err: HttpErrorResponse): void {
    this._errore.set(this.messaggio(err.status));
    this._loading.set(false);
  }

  // Sceglie il messaggio in base al codice di stato
  private messaggio(status: number): string {
    switch (status) {
      case 404:
        return 'Elemento inesistente: il post richiesto non esiste (errore 404).';
      case 0:
        return 'Rete assente: il server non è raggiungibile, controlla la connessione.';
      default:
        return `Errore ${status} dal server.`;
    }
  }
}

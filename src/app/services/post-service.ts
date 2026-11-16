import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../modelli/post';

@Service()
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Stato privato: solo il servizio può modificarlo
  private readonly _posts = signal<Post[]>([]);
  private readonly _post = signal<Post | null>(null);
  private readonly _creato = signal<Post | null>(null);

  // Stato pubblico in sola lettura: i componenti possono solo leggerlo
  readonly posts = this._posts.asReadonly();
  readonly post = this._post.asReadonly();
  readonly creato = this._creato.asReadonly();

  // GET /posts: legge l'elenco
  caricaPosts(): void {
    this.http.get<Post[]>(this.baseUrl).subscribe({
      next: (dati) => this._posts.set(dati),
    });
  }

  // GET /posts/:id: legge il singolo elemento
  caricaPost(id: number): void {
    this._post.set(null);
    this.http.get<Post>(`${this.baseUrl}/${id}`).subscribe({
      next: (dato) => this._post.set(dato),
    });
  }

  // POST /posts: crea un nuovo elemento (l'id lo assegna il server)
  aggiungiPost(nuovo: Omit<Post, 'id'>): void {
    this._creato.set(null);
    this.http.post<Post>(this.baseUrl, nuovo).subscribe({
      next: (risposta) => this._creato.set(risposta),
    });
  }
}

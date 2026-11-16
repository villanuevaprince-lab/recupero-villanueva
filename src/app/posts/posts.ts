import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../services/post-service';

@Component({
  imports: [RouterLink],
  selector: 'app-posts',
  styleUrl: './posts.css',
  templateUrl: './posts.html',
})
export class Posts implements OnInit {
  private readonly postService = inject(PostService);

  // Signal in sola lettura del servizio
  readonly posts = this.postService.posts;

  // Testo scritto nel campo di ricerca
  readonly filtro = signal('');

  // Elenco filtrato: si ricalcola da solo quando cambiano posts o filtro
  readonly postFiltrati = computed(() => {
    const testo = this.filtro().trim().toLowerCase();
    return this.posts().filter((p) => p.title.toLowerCase().includes(testo));
  });

  ngOnInit(): void {
    this.postService.caricaPosts();
  }
}

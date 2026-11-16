import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../services/post-service';

@Component({
  imports: [RouterLink],
  selector: 'app-post-dettaglio',
  styleUrl: './post-dettaglio.css',
  templateUrl: './post-dettaglio.html',
})
export class PostDettaglio implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);

  // Signal in sola lettura del servizio
  readonly post = this.postService.post;
  readonly loading = this.postService.loading;
  readonly errore = this.postService.errore;

  // Id letto dall'indirizzo /posts/:id
  readonly id = signal(0);

  ngOnInit(): void {
    // paramMap è un Observable: avvisa ogni volta che cambia l':id nell'indirizzo,
    // anche quando si resta su questa pagina con «precedente» e «successivo»
    this.route.paramMap.subscribe((parametri) => {
      const id = Number(parametri.get('id'));
      this.id.set(id);
      this.postService.caricaPost(id);
    });
  }

  precedente(): void {
    this.router.navigate(['/posts', this.id() - 1]);
  }

  successivo(): void {
    this.router.navigate(['/posts', this.id() + 1]);
  }
}

import { Routes } from '@angular/router';
import { Posts } from './posts/posts';
import { PostDettaglio } from './post-dettaglio/post-dettaglio';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: Posts },
  { path: 'posts/:id', component: PostDettaglio },
  { path: '**', redirectTo: 'posts' },
];

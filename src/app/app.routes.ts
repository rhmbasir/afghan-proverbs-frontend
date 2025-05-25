import { Routes } from '@angular/router';
import { ProverbListComponent } from './components/proverb-list/proverb-list.component';
import { ProverbFormComponent } from './components/proverb-form/proverb-form.component';
import { ProverbDetailComponent } from './components/proverb-detail/proverb-detail.component';

export const routes: Routes = [
  { path: '', component: ProverbListComponent },
  { path: 'add', component: ProverbFormComponent },
  { path: 'edit/:id', component: ProverbFormComponent },
  { path: 'proverb/:id', component: ProverbDetailComponent },
];
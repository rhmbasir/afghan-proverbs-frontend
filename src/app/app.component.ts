import { Component , OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProverbListComponent } from './components/proverb-list/proverb-list.component';
import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, FormsModule,ProverbListComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'afghan-proverbs-frontend';
}

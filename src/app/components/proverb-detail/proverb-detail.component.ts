import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import this

@Component({
  selector: 'app-proverb-detail',
  standalone: true, // if it's a standalone component
  imports: [CommonModule], // Add this line
  templateUrl: './proverb-detail.component.html',
  styleUrls: ['./proverb-detail.component.css'],
})
export class ProverbDetailComponent implements OnInit {
  proverb: any;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://afghan-proverbs-backend-1.onrender.com/proverbs/${id}`)
        .subscribe({
          next: (data) => {
            this.proverb = data;
            this.isLoading = false;
          },
          error: () => {
            this.error = 'Failed to load proverb details.';
            this.isLoading = false;
          }
        });
    }
  }
}
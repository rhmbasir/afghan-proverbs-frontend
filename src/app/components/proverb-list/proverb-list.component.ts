import { Component, OnInit } from '@angular/core';
import { ProverbService } from '../../services/proverb.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proverb-list',
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './proverb-list.component.html',
  styleUrls: ['./proverb-list.component.css'],
  standalone:true
})
export class ProverbListComponent implements OnInit {
  proverbs: any[] = [];
  filteredProverbs: any[] = [];
  searchTerm: string = '';
  category: string = '';
  categories:string[]=[];
  constructor(private proverbService: ProverbService, private router: Router) {}

  ngOnInit(): void {
    this.loadProverbs();
  }

 loadProverbs() {
  this.proverbService.getAll().subscribe((data: any) => {
    this.proverbs = data;
    this.filteredProverbs = data;
    this.extractUniqueCategories(); // Extract categories here
  });
}
extractUniqueCategories() {
  const categorySet = new Set(this.proverbs.map(p => p.category));
  this.categories = Array.from(categorySet);
}
  search() {
  if (!this.searchTerm && !this.category) {
    this.filteredProverbs = this.proverbs;
    return;
  }

  const term = this.searchTerm?.toLowerCase() || '';

  this.filteredProverbs = this.proverbs.filter(p =>
    (!this.searchTerm ||
      p.textDari?.toLowerCase().includes(term) ||
      p.textPashto?.toLowerCase().includes(term) ||
      p.translationEn?.toLowerCase().includes(term)
    ) &&
    (!this.category || p.category === this.category)
  );
}
  goToDetail(id: number) {
    this.router.navigate(['/proverb', id]);
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }
}
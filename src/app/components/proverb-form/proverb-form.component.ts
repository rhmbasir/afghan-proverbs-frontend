import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProverbService } from '../../services/proverb.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proverb-form',
  templateUrl: './proverb-form.component.html',
  styleUrls:['./proverb-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule]
})
export class ProverbFormComponent implements OnInit {
  proverbForm!: FormGroup;
  isEditMode = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private proverbService: ProverbService
  ) {}

  ngOnInit(): void {
    this.proverbForm = this.fb.group({
      textDari: ['', Validators.required],
      textPashto: ['', Validators.required],
      translationEn: ['', Validators.required],
      meaning: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.id = +idParam;
        this.proverbService.getById(this.id).subscribe(proverb => {
          this.proverbForm.patchValue(proverb);
        });
      }
    });
  }

onSubmit(): void {
  if (this.proverbForm.invalid) return;

  const newProverb = {
    textDari: this.proverbForm.value.textDari,
    textPashto: this.proverbForm.value.textPashto,
    translationEn: this.proverbForm.value.translationEn,
    meaning: this.proverbForm.value.meaning,
    category: this.proverbForm.value.category
  };

  if (this.isEditMode) {
    this.proverbService.updateProverb(this.id, newProverb).subscribe(() => {
      this.router.navigate(['/']);
    });
  } else {
    this.proverbService.addProverb(newProverb).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
}
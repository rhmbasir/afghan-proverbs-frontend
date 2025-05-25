import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ProverbFormComponent } from './proverb-form.component';
import { ProverbService } from  '../../services/proverb.service';

// Mock ProverbService
const mockProverbService = {
  getProverbById: jasmine.createSpy('getProverbById').and.returnValue(of({
    textDari: 'test dari',
    textPashto: 'test pashto',
    translationEn: 'test en',
    meaning: 'test meaning',
    category: 'test category'
  })),
  addProverb: jasmine.createSpy('addProverb').and.returnValue(of({})),
  updateProverb: jasmine.createSpy('updateProverb').and.returnValue(of({}))
};

describe('ProverbFormComponent', () => {
  let component: ProverbFormComponent;
  let fixture: ComponentFixture<ProverbFormComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProverbFormComponent],
      providers: [
        { provide: ProverbService, useValue: mockProverbService },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => null }) // Simulates "add" mode
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProverbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.proverbForm).toBeDefined();
    expect(component.proverbForm.controls['textDari']).toBeDefined();
    expect(component.proverbForm.controls['category']).toBeDefined();
  });

  it('should call addProverb on submit in add mode', () => {
    component.proverbForm.setValue({
      textDari: 'test',
      textPashto: 'test',
      translationEn: 'test',
      meaning: 'test',
      category: 'test'
    });
    component.onSubmit();
    expect(mockProverbService.addProverb).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call updateProverb on submit in edit mode', fakeAsync(() => {
    // Simulate edit mode
    component.isEditMode = true;
    component.id = 1;
    component.proverbForm.setValue({
      textDari: 'updated',
      textPashto: 'updated',
      translationEn: 'updated',
      meaning: 'updated',
      category: 'updated'
    });

    component.onSubmit();
    tick(); // simulates async delay
    expect(mockProverbService.updateProverb).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));
});
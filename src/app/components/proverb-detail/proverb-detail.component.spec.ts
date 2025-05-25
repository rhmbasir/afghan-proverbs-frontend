import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProverbDetailComponent } from './proverb-detail.component';

describe('ProverbDetailComponent', () => {
  let component: ProverbDetailComponent;
  let fixture: ComponentFixture<ProverbDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProverbDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProverbDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

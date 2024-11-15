import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarModalComponent } from './criar-modal.component';

describe('CriarModalComponent', () => {
  let component: CriarModalComponent;
  let fixture: ComponentFixture<CriarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarModalComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CriarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

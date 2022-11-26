import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProjectsComponent } from './finished-projects.component';

describe('FinishedProjectsComponent', () => {
  let component: FinishedProjectsComponent;
  let fixture: ComponentFixture<FinishedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

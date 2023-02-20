import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTvshowsComponent } from './all-tvshows.component';

describe('AllTvshowsComponent', () => {
  let component: AllTvshowsComponent;
  let fixture: ComponentFixture<AllTvshowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTvshowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTvshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

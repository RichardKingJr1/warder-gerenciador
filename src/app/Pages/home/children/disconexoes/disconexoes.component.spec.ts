import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconexoesComponent } from './disconexoes.component';

describe('DisconexoesComponent', () => {
  let component: DisconexoesComponent;
  let fixture: ComponentFixture<DisconexoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconexoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconexoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

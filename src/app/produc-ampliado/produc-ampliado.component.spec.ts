import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducAmpliadoComponent } from './produc-ampliado.component';

describe('ProducAmpliadoComponent', () => {
  let component: ProducAmpliadoComponent;
  let fixture: ComponentFixture<ProducAmpliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducAmpliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducAmpliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

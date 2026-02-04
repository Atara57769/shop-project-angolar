import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdact } from './add-prodact';

describe('AddProdact', () => {
  let component: AddProdact;
  let fixture: ComponentFixture<AddProdact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProdact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProdact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

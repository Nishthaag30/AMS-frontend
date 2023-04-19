import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsAdminComponent } from './signup-as-admin.component';

describe('SignupAsAdminComponent', () => {
  let component: SignupAsAdminComponent;
  let fixture: ComponentFixture<SignupAsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

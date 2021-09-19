import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangueAvatarComponent } from './changue-avatar.component';

describe('ChangueAvatarComponent', () => {
  let component: ChangueAvatarComponent;
  let fixture: ComponentFixture<ChangueAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangueAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangueAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

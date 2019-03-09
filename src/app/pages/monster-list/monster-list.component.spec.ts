import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterListComponent } from './monster-list.component';

describe('MonsterListComponent', () => {
  let component: MonsterListComponent;
  let fixture: ComponentFixture<MonsterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

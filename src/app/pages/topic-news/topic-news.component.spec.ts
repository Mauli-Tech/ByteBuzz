import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNewsComponent } from './topic-news.component';

describe('TopicNewsComponent', () => {
  let component: TopicNewsComponent;
  let fixture: ComponentFixture<TopicNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicNewsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

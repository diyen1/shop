import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageFileUploadComponent } from './chat-message-file-upload.component';

describe('ChatMessageFileUploadComponent', () => {
  let component: ChatMessageFileUploadComponent;
  let fixture: ComponentFixture<ChatMessageFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

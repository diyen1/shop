import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdlModule} from '@angular-mdl/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmfbFileUploadModule} from '../file-upload/dmfb-file-upload.module';
import {ChatComponent} from './chat/chat.component';
import {ChatFeedComponent} from './chat-feed/chat-feed.component';
import {ChatFormComponent} from './chat-form/chat-form.component';
import {ChatNavComponent} from './chat-nav/nav.component';
import {ChatUserListComponent} from './chat-user-list/chat-user-list.component';
import {MessageComponent} from './message/message.component';
import {DmfbAuthModule} from '../auth/dmfb-auth.module';
import {ChatUserComponent} from './chat-user/chat-user.component';
import {ChatMessageFileUploadComponent} from './chat-message-file-upload/chat-message-file-upload.component';



@NgModule({
  declarations: [
    ChatComponent,
    ChatFeedComponent,
    ChatFormComponent,
    ChatNavComponent,
    ChatUserListComponent,
    MessageComponent,
    ChatUserComponent,
    ChatMessageFileUploadComponent,
  ],
  imports: [
    BrowserModule,
    DmfbFileUploadModule,
    DmfbAuthModule,
    MdlModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ChatComponent,
    ChatFeedComponent,
    ChatFormComponent,
    ChatNavComponent,
    ChatUserListComponent,
    MessageComponent,
    ChatUserComponent,
  ],
  providers: [],
  bootstrap: []
})
export class DmfbChatModule { }

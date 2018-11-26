import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdlModule} from '@angular-mdl/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmfbFileUploadComponent} from './dmfb-file-upload/dmfb-file-upload.component';



@NgModule({
  declarations: [
    DmfbFileUploadComponent,
  ],
  imports: [
    BrowserModule,
    MdlModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DmfbFileUploadComponent,
  ],
  // providers: [AngularFireDatabase, AngularFireAuth],
  bootstrap: []
})
export class DmfbFileUploadModule { }

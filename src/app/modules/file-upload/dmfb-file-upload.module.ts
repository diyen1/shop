import { NgModule } from '@angular/core';
import {MdlModule} from '@angular-mdl/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmfbFileUploadComponent} from './dmfb-file-upload/dmfb-file-upload.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../../interceptors/token.interceptor';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [
    DmfbFileUploadComponent,
  ],
  imports: [
    CommonModule,
    MdlModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DmfbFileUploadComponent,
  ],
  providers: [],
  bootstrap: []
})
export class DmfbFileUploadModule { }

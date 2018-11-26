import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CrudCreateComponent} from './create/crud-create.component';
import {MdlModule} from '@angular-mdl/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {DmfbFileUploadModule} from '../file-upload/dmfb-file-upload.module';
import {CrudReadAllComponent} from './read/read-all/crud-read-all.component';
import {CrudReadSingleComponent} from './read/read-single/crud-read-single.component';

const components = [
  CrudCreateComponent,
  CrudReadAllComponent,
  CrudReadSingleComponent,
];

@NgModule({
  declarations: [
    ... components,
  ],
  imports: [
    BrowserModule,
    DmfbFileUploadModule,
    MdlModule,
    FormsModule,
    ReactiveFormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    ... components,
  ],
  // providers: [AngularFireDatabase, AngularFireAuth],
  bootstrap: []
})
export class DmfbCrudModule { }

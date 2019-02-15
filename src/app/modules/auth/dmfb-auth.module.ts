import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdlModule} from '@angular-mdl/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthService} from './services/auth.service';
import {DmfbCrudModule} from '../crud/dmfb-crud.module';
import {DmfbFileUploadModule} from '../file-upload/dmfb-file-upload.module';
import {UsersService} from './services/users.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    MdlModule,
    FormsModule,
    ReactiveFormsModule,
    DmfbCrudModule,
    DmfbFileUploadModule,
    // AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  // providers: [AngularFireDatabase, AngularFireAuth],
  providers: [AuthService, UsersService],
  bootstrap: []
})
export class DmfbAuthModule { }

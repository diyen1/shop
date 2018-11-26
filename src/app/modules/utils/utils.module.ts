import { NgModule } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {NavComponent} from './nav/nav.component';
import {MdlModule} from '@angular-mdl/core';
import {CommonModule} from '@angular/common';
import {UtilsService} from './utils.service';

const declarations = [
  HeaderComponent,
  NavComponent,
];

const modules = [
  MdlModule,
  CommonModule,
];

@NgModule({
  declarations: [
    ... declarations
  ],
  imports: [
    ... modules
  ],
  exports: [
    ... declarations
  ],
  providers: [
    UtilsService,
  ],
  bootstrap: []
})
export class UtilsModule { }

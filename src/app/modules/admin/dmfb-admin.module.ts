import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {MdlModule} from '@angular-mdl/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmfbFileUploadModule} from '../file-upload/dmfb-file-upload.module';
import {AdminNavComponent} from './admin-nav/nav.component';
import {DmfbAuthModule} from '../auth/dmfb-auth.module';
import {DmfbCrudModule} from '../crud/dmfb-crud.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminShopComponent} from './shop/admin-shop.component';
import {DmfbAdminComponent} from './dmfb-admin.component';
import {AdminUsersComponent} from './users/admin-users.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {DateCellComponent} from './date-cell/date-cell.component';
import {PriceCellComponent} from './price-cell/price-cell.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    DmfbAdminComponent,
    AdminDashboardComponent,
    AdminShopComponent,
    AdminNavComponent,
    AdminUsersComponent,
    DateCellComponent,
    PriceCellComponent,
  ],
  entryComponents: [
    DateCellComponent,
    PriceCellComponent,
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    AdminRoutingModule,
    DmfbFileUploadModule,
    DmfbAuthModule,
    MdlModule,
    FormsModule,
    DmfbCrudModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminNavComponent,
  ],
  providers: [],
  bootstrap: []
})
export class DmfbAdminModule { }

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
import {DateCellComponent} from './cells/date-cell/date-cell.component';
import {PriceCellComponent} from './cells/price-cell/price-cell.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard.component';
import {RouterModule} from '@angular/router';
import {ImageCellComponent} from './cells/image-cell/image-cell.component';
import {PrimaryCellComponent} from './cells/primary-cell/primary-cell.component';
import {AdminEditServiceComponent} from './admin-edit-profile/admin-edit-service.component';
import {YesNoCellComponent} from './cells/yes-no-cell/yes-no-cell.component';

@NgModule({
  declarations: [
    DmfbAdminComponent,
    AdminDashboardComponent,
    AdminShopComponent,
    AdminNavComponent,
    AdminUsersComponent,
    AdminEditServiceComponent,
    DateCellComponent,
    PriceCellComponent,
    ImageCellComponent,
    PrimaryCellComponent,
    YesNoCellComponent,
  ],
  entryComponents: [
    DateCellComponent,
    PriceCellComponent,
    ImageCellComponent,
    PrimaryCellComponent,
    YesNoCellComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    Ng2SmartTableModule,
    DmfbFileUploadModule,
    DmfbAuthModule,
    MdlModule,
    FormsModule,
    DmfbCrudModule,
    ReactiveFormsModule,
    // AdminRoutingModule,
  ],
  exports: [
    AdminNavComponent,
  ],
  providers: [],
  bootstrap: []
})
export class DmfbAdminModule { }

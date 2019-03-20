import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MdlModule} from '@angular-mdl/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {routes} from './routes';
import {ShopComponent} from './shop/shop.component';
import {SearchComponent} from './search/search.component';
import {ProfileComponent} from './profile/profile.component';
import {ServiceSingleComponent} from './service-single/service-single.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SellerProfileComponent} from './seller-profile/seller-profile.component';
import {AddServiceComponent} from './add-service/add-service.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {UtilsModule} from './modules/utils/utils.module';
import {AuthGuard} from './auth.guard';
import {DmfbCrudModule} from './modules/crud/dmfb-crud.module';
import {DmfbAuthModule} from './modules/auth/dmfb-auth.module';
import {DmfbChatModule} from './modules/chat/dmfb-chat.module';
import {EditServiceComponent} from './edit-service/edit-service.component';
import {ServicesListComponent} from './services-list/services-list.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SlideshowModule} from 'ng-simple-slideshow';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {DmfbAdminModule} from './modules/admin/dmfb-admin.module';
import {ReportDialogComponent} from './dialogs/report-dialog/report-dialog.component';

// import {OnlineStatusModule} from 'ngx-online-status';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    SearchComponent,
    ProfileComponent,
    ServiceSingleComponent,
    ProfileComponent,
    SellerProfileComponent,
    AddServiceComponent,
    EditServiceComponent,
    ServicesListComponent,
    EditProfileComponent,
    ReportDialogComponent,
  ],
  entryComponents: [
    ReportDialogComponent,
  ],
  imports: [
    DmfbCrudModule,
    DmfbAuthModule,
    DmfbChatModule,
    BrowserModule,
    MdlModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    InfiniteScrollModule,
    SlideshowModule,
    // OnlineStatusModule,
    AngularFireModule.initializeApp(environment.firebase),
    DmfbAdminModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

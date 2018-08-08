import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
//import { FilterPipe } from './pipe/filter.pipe';
import {LoaderService } from './service/loader.service';


@NgModule({
  declarations: [
    AppComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: '',
      redirectTo: 'user',
      pathMatch: 'full'
    }, {
      path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule'
    }
  ])
  ],
  providers: [ LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

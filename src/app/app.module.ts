import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule }   from '@angular/router';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { ToastyModule } from 'ng2-toasty'
import 'hammerjs';

import { AppComponent } from './app.component';
import { CardModule } from './shared/card/card.module';
import { Toasty } from './shared/sq-toasty/sq-toasty.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './shared/utils/api.service';
import { ArrayService } from './shared/utils/array.service';
import { CookiesService } from './shared/cookies/cookies.service';
import { CoinsService } from './shared/utils/coins.service';
import { UserService } from './shared/user/user.service';
import { CursorFollowerListComponent } from './cursor-follower/cursor-follower/cursor-follower.component';
import { EyesComponent } from './cursor-follower/eyes/eyes.component';
import { CursorFollowerService } from './cursor-follower/cursor-follower.service';
import { CursorService } from './cursor/cursor.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        CursorFollowerListComponent,
        EyesComponent
    ],  
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([ 
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'games', loadChildren: './student/games/games.module#GamesModule' },
            { path: 'profile', loadChildren: './student/user-profile/user-profile.module#UserProfileModule' },
            { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
        ])
    ],
    providers: [ApiService, ArrayService, CookiesService, CursorFollowerService, CursorService, CoinsService, Toasty, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {}
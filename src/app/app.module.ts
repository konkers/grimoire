import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MonsterListComponent } from './pages/monster-list/monster-list.component';
import { MonsterDetailComponent } from './pages/monster-detail/monster-detail.component';
import { StatComponent } from './components/stat/stat.component';
import { SpeedComponent } from './components/speed/speed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonsterListComponent,
    MonsterDetailComponent,
    StatComponent,
    SpeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

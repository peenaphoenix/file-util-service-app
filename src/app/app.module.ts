import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBox } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestComponent } from './test/test.component';
import { ActualComponent } from './actual/actual.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { DialogComponent } from './actual/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
 

@NgModule({
  declarations: [
    AppComponent,
    DialogBox,
    TestComponent,
    ActualComponent,
    DialogComponent
  ],
  entryComponents: [DialogBox,DialogComponent],
  imports: [
    BrowserModule,
    MatTreeModule,
    AppRoutingModule,
    MatRippleModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxFileDropModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

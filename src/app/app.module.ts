import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';

// FEATURES MODULES
import { CoreModule } from './core/core.module';
import { EventsModule } from './events/events.module';

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, BrowserAnimationsModule, HttpClientModule, CoreModule, EventsModule, AppRoutingModule ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}

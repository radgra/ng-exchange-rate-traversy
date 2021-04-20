import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { RateSelectorComponent } from './exchange-rates/rate-selector/rate-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExchangeRatesComponent,
    RateSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

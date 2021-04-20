import { ICurrency } from './../models/currency.interface';
import { CurrencyService, IExchangeRate } from './../services/currency.service';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  currencies:ICurrency[]
  exchangeRates:IExchangeRate[] = []
  constructor(private currencyService:CurrencyService) { }

  ngOnInit() {
    const startingRates = [{currency:'EUR', 'value':1}, {currency:'USD', 'value':1}]

    this.currencies = this.currencyService.currencies
    this.currencyService.setStartingExchangeRates(startingRates)
    
    this.currencyService.onRatesChange$.pipe(
      tap((rates:IExchangeRate[]) => this.exchangeRates = rates)
      ).subscribe()

    this.currencyService.recalculateRates()
  }

  
  onCurrencyChange(curr:ICurrency, index:number) {  
    if(index === 0) {
      this.currencyService.changeCurrencyForBaseExchangeRate(curr)
    } 

    this.currencyService.changeSingleExchangeRate(curr, index)
    this.currencyService.recalculateRates()
  }

  onRateValueChange(rate:IExchangeRate, index:number) {
    this.currencyService.changeBaseCurrencyByIndex(index, rate.value)
    this.currencyService.recalculateRates()
  }
}

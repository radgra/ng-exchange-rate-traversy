import { ICurrency } from './../../models/currency.interface';
import { IExchangeRate } from './../../services/currency.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rate-selector',
  templateUrl: './rate-selector.component.html',
  styleUrls: ['./rate-selector.component.scss']
})
export class RateSelectorComponent implements OnInit {
  private _rate: IExchangeRate
  selectedCurrency: ICurrency
  exchangeValue:number;
  @Output() onCurrencyChange:EventEmitter<ICurrency> = new EventEmitter() 
  @Output() onRateValueChange:EventEmitter<IExchangeRate> = new EventEmitter() 
  @Input() currencies: ICurrency[]

  @Input() set rate(rate: IExchangeRate) {
    if(!this.rate || rate.currency !== this.rate.currency) {
      const foundCurr = this.currencies.find(c => c.name === rate.currency)
      this.selectedCurrency = foundCurr
    }
    this._rate = rate
  }

  get rate(): IExchangeRate {
    return this._rate
  }

  constructor() { }

  ngOnInit() {
    
  }

  onCurrencySelected($event:ICurrency) {
    this.onCurrencyChange.emit($event)
  }

  onValueChange($event) {
    this.onRateValueChange.emit(this.rate)
  }

}

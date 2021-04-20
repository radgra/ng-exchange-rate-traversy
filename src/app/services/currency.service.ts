import { currencyList } from './currencies';
import { ICurrency } from './../models/currency.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IExchangeRate {
  currency:string,
  value:number;
  ratio?:number;
}


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currencies:ICurrency[] = currencyList
  private _exchangeRates:IExchangeRate[] = []
  private onRatesChangeSubject:BehaviorSubject<IExchangeRate[]> = new BehaviorSubject(this._exchangeRates)
  onRatesChange$:Observable<IExchangeRate[]> = this.onRatesChangeSubject.asObservable()
  private baseRate:IExchangeRate

  constructor() { }


  addExchangeRate(rate:IExchangeRate) {
    const foundCurr = this.currencies.find(curr => curr.name === rate.currency)
    rate.ratio = foundCurr.ratio
    this.exchangeRates.push(rate)
    this.onRatesChangeSubject.next([...this.exchangeRates])
  }

  setStartingExchangeRates(rates:IExchangeRate[]) {
    if(rates.length === 0) return

    this.exchangeRates = rates.map(rate => {
      const foundCurr = this.currencies.find(curr => curr.name === rate.currency)
      rate.ratio = foundCurr.ratio
      return rate
    })
    this.baseRate = rates[0]
  }

  
  recalculateRates() {
    const recalculatedRates = this.exchangeRates.map((el:IExchangeRate) => {
      if(el.currency === this.baseRate.currency) {
        el.value = this.baseRate.value
      } else {
        el.value = this.baseRate.value * el.ratio/this.baseRate.ratio
      }
      return el
    })
    this.exchangeRates = recalculatedRates
    this.onRatesChangeSubject.next([...this.exchangeRates])

  }

  changeSingleExchangeRate(curr:ICurrency, rateIndex:number) {
    // Should recalulate only one.
    const rate = this.exchangeRates[rateIndex] 
    this.exchangeRates[rateIndex] = {currency:curr.name, ratio:curr.ratio, value:rate.value}
  }


  get exchangeRates():IExchangeRate[] {
    return this._exchangeRates
  }


  set exchangeRates(rates:IExchangeRate[]) {
    this._exchangeRates = [...rates]
    // this.exchangeRatesSubject.next(this._exchangeRates)
  }

  changeCurrencyForBaseExchangeRate(curr:ICurrency, value=this.baseRate.value) {
    this.baseRate = {currency:curr.name, ratio:curr.ratio, value}
  }

  changeBaseCurrencyByIndex(index:number, value=this.baseRate.value) {
    const newBase = {...this.exchangeRates[index]}
    newBase.value = value
    this.baseRate = newBase
  }

}

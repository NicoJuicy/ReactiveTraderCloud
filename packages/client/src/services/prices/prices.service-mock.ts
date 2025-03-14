import { bind } from "@react-rxjs/core"
import { Observable, of } from "rxjs"
import { map, scan, withLatestFrom } from "rxjs/operators"

import { getCurrencyPair$ } from "../currencyPairs/currencyPairs.service-mock"
import { calculateSpread } from "./prices"
import { HistoryPrice, Price, PriceMovementType } from "./types"

function* makePriceGenerator(
  symbol: string,
): Generator<HistoryPrice, HistoryPrice, HistoryPrice> {
  let mid = Math.trunc(Math.random() * 1_000_000) / 100_000
  while (true) {
    const now = new Date()
    const price: HistoryPrice = {
      ask: mid + 0.0002,
      mid,
      bid: mid - 0.0002,
      creationTimestamp: now.getTime(),
      symbol,
      valueDate: [now.getFullYear(), now.getMonth() + 1, now.getDate()]
        .map((x) => x.toString().padStart(2, "0"))
        .join("-"),
    }
    yield price
    mid = mid * (1 + (Math.random() > 0.5 ? 0.0001 : -0.0001))
  }
}

const [, getSymbolPrices$] = bind(
  (symbol: string) =>
    new Observable<HistoryPrice[]>((observer) => {
      const priceGenerator = makePriceGenerator(symbol)
      let prices: HistoryPrice[] = []
      for (let i = 0; i < 50; i++) {
        prices.push(priceGenerator.next().value)
      }
      observer.next(prices)

      let token: any = 0

      const scheduleNextPrice = () => {
        token = setTimeout(
          () => {
            prices = prices.slice(1).concat(priceGenerator.next().value)
            observer.next(prices)
            scheduleNextPrice()
          },
          Math.max(150, Math.random() * 1000),
        )
      }

      scheduleNextPrice()

      return () => {
        clearTimeout(token)
      }
    }),
)

export const [, getIsSymbolDataStale$] = bind(
  (_: string): Observable<boolean> => of(false),
)

export const [usePrice, getPrice$] = bind((symbol: string) =>
  getSymbolPrices$(symbol).pipe(
    map((prices) => prices[prices.length - 1]),
    withLatestFrom(getCurrencyPair$(symbol)),
    scan(
      (acc, [price, ccyPair]) => ({
        ...price,
        movementType:
          acc === undefined
            ? PriceMovementType.NONE
            : price.mid > acc.mid
              ? PriceMovementType.UP
              : PriceMovementType.DOWN,

        spread: calculateSpread(
          price.ask,
          price.bid,
          ccyPair.ratePrecision,
          ccyPair.pipsPosition,
        ),
      }),
      undefined as any as Price,
    ),
  ),
)

export const [useHistoricalPrices, getHistoricalPrices$] = bind<
  [string],
  HistoryPrice[]
>((symbol: string) =>
  getSymbolPrices$(symbol).pipe(map((prices) => prices.slice(0, -1))),
)

import { bind } from "@react-rxjs/core"
import { equals } from "client/utils/equals"
import { mapObject } from "client/utils/mapObject"
import { distinctUntilChanged, map } from "rxjs/operators"
import { currentPositions$ } from "services/analytics"

import { Title } from "../styled"
import PNLBar, { PNLBarProps } from "./PNLBar"

const [usePnL, pnL$] = bind(
  currentPositions$.pipe(
    map((positions) => mapObject(positions, (position) => position.basePnl)),
    distinctUntilChanged(equals),
    map((basePnlsDict) => {
      const basePnls = Object.values(basePnlsDict)
      const max = Math.max(...basePnls)
      const min = Math.min(...basePnls)
      const maxVal = Math.max(Math.abs(max), Math.abs(min))

      return Object.entries(basePnlsDict).map(([symbol, basePnl]) => ({
        symbol,
        basePnl,
        maxVal,
      }))
    }),
  ),
)

export { pnL$ }

export const PnLInner = ({ data }: { data: PNLBarProps[] }) => (
  <div>
    <Title>PnL</Title>
    {data.map((pnlItem) => (
      <PNLBar key={pnlItem.symbol} {...pnlItem} />
    ))}
  </div>
)

export const PnL = () => {
  const data = usePnL()
  return <PnLInner data={data} />
}

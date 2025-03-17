import styled from "styled-components"

import { Line } from "@/client/components/Line"

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export const PriceContainer = styled(FlexDiv).attrs(
  (props: { distance: number }) => ({
    style: {
      transform: `translate(${props.distance}%)`,
    },
  }),
)<{ distance: number }>`
  width: 100%;
  transition: transform 0.5s;
  transition-timing-function: ${({ theme }) => theme.motion.easing};
`

export const PriceLabel = styled.div<{
  distance: number
}>`
  align-self: center;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  &:hover {
    transform: scale(1.64);
    transform-origin: ${({ distance }) =>
        distance > 35 ? "calc(164% - 15px)" : "center"}
      12px;
  }
`
const barLength = 180
const indicatorWidth = 5

export const PriceIndicator = styled.div.attrs<{
  distance: number
}>(({ distance }) => {
  const translationToCenterOfBar = barLength / 2 - indicatorWidth / 2
  const translationDistanceAlongBar =
    distance === -Infinity ? 0 : (barLength / 100) * distance
  return {
    style: {
      color: "red",
      transform: `translate(calc(${translationToCenterOfBar}px + ${translationDistanceAlongBar}px))`,
      transition: "transform 0.5s",
    },
  }
})<{ distance: number }>`
  height: 100%;
  width: ${indicatorWidth}px;

  background-color: ${({ theme }) => theme.color["Colors/Border/border-buy"]};
`

export const BarPriceContainer = styled.div`
  width: ${barLength}px;
`

export const Bar = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) =>
    theme.color["Colors/Background/bg-tertiary"]};
  height: ${indicatorWidth}px;
`

export const CenterLine = styled(Line)`
  position: absolute;
  left: ${barLength / 2 - 1}px;
`

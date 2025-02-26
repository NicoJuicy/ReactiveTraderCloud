import styled, { css, DefaultTheme, keyframes } from "styled-components"

import { isBuy } from "@/client/App/Credit/common"
import { Typography } from "@/client/components/Typography"
import { Theme } from "@/client/theme/themes"
import { Direction } from "@/generated/TradingGateway"

const backgroundEffectKeyframes = ({
  direction,
  theme,
}: {
  direction: Direction
  theme: Theme
}) => keyframes`
  5% {
    background-color: ${getDirectionColor(theme, direction)};
    color: white;
  }
  80% {
    background-color: ${getDirectionColor(theme, direction)};
    color: white;
  }
`

const getAnimationCSSProperty = (props: {
  direction: Direction
  theme: Theme
}) => css`
  animation: ${backgroundEffectKeyframes(props)} 5s;
`

const getDirectionColor = (theme: DefaultTheme, direction: Direction) =>
  isBuy(direction)
    ? theme.newTheme.color["Colors/Background/bg-buy-primary"]
    : theme.newTheme.color["Colors/Background/bg-sell-primary"]

type TradeButtonProps = {
  direction: Direction
  priceAnnounced: boolean
  isStatic?: boolean
  expired?: boolean
  theme: Theme
}

const backgroundEffect = ({
  priceAnnounced,
  isStatic,
  direction,
  theme,
}: TradeButtonProps) =>
  priceAnnounced && !isStatic
    ? getAnimationCSSProperty({ direction, theme })
    : isStatic
      ? `
    background-color: ${getDirectionColor(theme, direction)};
    color: white;`
      : ""

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SharedButtonStyle = styled.button`
  height: 60px;
  width: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`

export const TradeButton = styled(SharedButtonStyle)<TradeButtonProps>`
  position: relative;
  background-color: ${({ theme }) =>
    theme.newTheme.color["Colors/Background/bg-primary"]};
  color: ${({ theme, priceAnnounced, direction }) =>
    priceAnnounced ? getDirectionColor(theme, direction) : "inherit"};
  transition: background-color 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  ${backgroundEffect}
  ${({ isStatic, theme, direction }) =>
    isStatic
      ? `
  background-color: ${getDirectionColor(theme, direction)};
  color: white;`
      : ``}
  ${({ theme, direction, disabled, priceAnnounced }) =>
    disabled && !priceAnnounced
      ? `
  cursor: initial;
  pointer-events: none;
  `
      : `
  
  &:hover {
    background-color: ${getDirectionColor(theme, direction)} !important;
    color: ${theme.newTheme.color["Colors/Text/text-primary (900)"]};
    }
    `};
`

export const QuotePriceLoading = styled(SharedButtonStyle)`
  transition: background-color 0.2s ease;
  opacity: 0.5;
  margin: 0;
`

const Box = styled.div`
  padding: 0;
  margin: 0;
`

export const PriceContainer = styled(Box)`
  padding-top: ${({ theme }) => theme.newTheme.spacing.xl};
`

export const PriceTypography = styled(Typography)`
  display: inline;
  line-height: 0;
`

export const Price = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ disabled }) => (disabled ? "opacity: 0.3" : "")}
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

export const ExpiredPrice = styled.div`
  position: absolute;
  left: 30px;
  top: 55px;
  z-index: 1;
  color: ${({ theme }) =>
    theme.newTheme.color["Colors/Text/text-error-primary (600)"]};
  font-size: 8px;
  text-transform: uppercase;
  // animation: ${fadeOut} 1s linear;
  // transition: visibility 1s linear;
  // animation-fill-mode: forwards;
  // animation-delay: 1s;
`

export const Icon = styled.i`
  font-size: 20px;
  margin: 3px 0;
`

export const PriceButtonDisabledPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  border-radius: 3px;
  font-size: 10px;
  transition: background-color 0.2s ease;
  height: 58px;
  min-height: 2rem;
  max-height: 3.7rem;
  margin-bottom: 1px;
  min-width: 100px;
  line-height: normal;
  opacity: 0.5;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
`

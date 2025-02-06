import styled, { css, CSSObject, CSSProperties } from "styled-components"

import { Color, TextStyles } from "../theme/types"
import { Box, BoxProps } from "./Box"

interface TypographyProps extends BoxProps {
  variant?: TextStyles
  color?: Color
  allowLineHeight?: boolean
  fontSize?: number | string
  textTransform?: CSSProperties["textTransform"]
}

export const Typography = styled(Box)<TypographyProps>`
  ${({ variant, theme }) =>
    variant ? theme.newTheme.textStyles[variant] : null}
  ${({ theme, color, allowLineHeight, textTransform, fontSize }) => {
    const style: CSSObject = {}
    style.color = color ? theme.newTheme.color[color] : "inherit"
    style.lineHeight = allowLineHeight ? undefined : "normal"
    style.textTransform = textTransform
    if (fontSize) {
      style.fontSize = fontSize
    }
    return css(style)
  }}}

`

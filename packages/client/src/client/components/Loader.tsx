import styled from "styled-components"

import { AdaptiveLoader } from "./AdaptiveLoader"

interface Props {
  minWidth?: string
  minHeight?: string
  ariaLabel?: string
  size?: number
  opacity?: number
}

const LoadableStyle = styled.div<Props>`
  width: 100%;
  min-width: ${({ minWidth = "100%" }) => minWidth};
  height: 100%;
  min-height: ${({ minHeight = "100%" }) => minHeight};
  border-radius: 0.1875rem;
  background-color: ${({ theme }) =>
    theme.color["Colors/Background/bg-secondary_subtle"]};
  color: ${({ theme }) => theme.color["Colors/Text/text-primary (900)"]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  fill: ${({ theme }) => theme.color["Colors/Text/text-primary (900)"]};
  opacity: ${({ opacity }) => (opacity ? opacity : "1")};
`

export const Loader = ({ size, ...props }: Props) => (
  <LoadableStyle {...props}>
    <AdaptiveLoader size={size || 50} speed={1.4} ariaLabel={props.ariaLabel} />
  </LoadableStyle>
)

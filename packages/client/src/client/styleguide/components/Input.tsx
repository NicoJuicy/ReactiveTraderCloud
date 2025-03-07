import { HTMLAttributes, InputHTMLAttributes, useRef } from "react"
import styled from "styled-components"

import { AccentName } from "@/client/theme/colors"

const inputColors: Record<"error" | "info", AccentName> = {
  error: "negative",
  info: "primary",
}

export interface InputStyleProps extends HTMLAttributes<HTMLInputElement> {
  label: string
  status?: "error" | "info"
  type: "text" | "number"
  disabled?: boolean
  value?: string
}

type LabelProps = {
  disabled?: boolean
}

const InputGroup = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 4px;
  position: relative;
  & input[type="number"]::-webkit-inner-spin-button,
  & input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const StyledInput = styled.input<InputStyleProps>`
  border-bottom: ${({ status, theme }) =>
    `1px solid ${
      status
        ? theme.accents[inputColors[status]].darker
        : theme.name === "light"
          ? theme.primary[1]
          : theme.primary[2]
    }`};
  background: ${({ theme }) => theme.primary.base};
  color: ${({ theme }) => theme.secondary.base};
  font-size: 12px;
  height: 26px;
  padding: 3px;
  text-align: ${({ type }) => (type === "number" ? "right" : "left")};
  transition: border 0.5s;
  -webkit-appearance: textfield;
  width: 100%;
  margin: 0;
  &:hover {
    border-bottom: ${({ status, theme }) =>
      `1px solid ${
        status
          ? theme.accents[inputColors[status]].base
          : theme.name === "light"
            ? "#beccdc"
            : theme.colors.light.secondary[1]
      }`};
  }
  &:focus {
    caret-color: ${({ status, theme }) =>
      `${
        status
          ? theme.accents[inputColors[status]].darker
          : theme.accents.primary.darker
      }`};
    outline: none;
    border-bottom: ${({ status, theme }) =>
      `1px solid ${
        status
          ? theme.accents[inputColors[status]].darker
          : theme.accents.primary.darker
      }`};
  }
  &:disabled {
    border-bottom: ${({ status, theme }) =>
      `1px solid ${
        status ? theme.accents[inputColors[status]].darker : theme.primary[2]
      }`};
    color: ${({ theme, disabled }) =>
      theme.name === "light"
        ? disabled
          ? theme.secondary[2]
          : theme.secondary[2]
        : disabled
          ? theme.colors.light.secondary[1]
          : theme.colors.light.secondary[2]};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
  &::placeholder {
    color: ${({ theme, disabled }) =>
      theme.name === "light"
        ? disabled
          ? theme.secondary[1]
          : theme.secondary[2]
        : disabled
          ? theme.colors.light.secondary[1]
          : theme.colors.light.secondary[2]};
  }
`

const Label = styled.label<LabelProps>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.secondary[1] : theme.secondary[2]};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
`

export const Input = (
  props: InputStyleProps & InputHTMLAttributes<HTMLInputElement>,
) => {
  const { label, disabled, className } = props
  const refInput = useRef<HTMLInputElement>(null)
  const focusInput = () => refInput.current?.focus()

  return (
    <div className={className}>
      <InputGroup>
        <Label disabled={disabled} onClick={focusInput}>
          {label.toUpperCase()}
          <StyledInput ref={refInput} {...props} />
        </Label>
      </InputGroup>
    </div>
  )
}

export default Input

import { useEffect, useRef, useState } from "react"
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa"
import styled, { css } from "styled-components"

import { usePopUpMenu } from "@/client/utils/usePopUpMenu"

const DropdownLayout = styled.div`
  ${({ theme }) => theme.textStyles["Display xs/Regular"]}
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  line-height: 0;
  margin-block-end: 0;

  color: ${({ theme }) => theme.color["Colors/Text/text-secondary (700)"]};
  cursor: pointer;
  transition: all 200ms ease;
  padding: 0 ${({ theme }) => theme.spacing.md};
`

const DropdownOptions = styled.div`
  position: absolute;
  top: 30px;
  left: 0px;
  background-color: ${({ theme }) =>
    theme.color["Colors/Background/bg-primary"]};
  box-shadow: 0 7px 26px 0 rgba(23, 24, 25, 0.5);
  z-index: 100;
`
const DropdownOption = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.density.md};
  padding: ${({ theme }) => `${theme.spacing["2xl"]} ${theme.spacing["lg"]}`};
  color: ${({ theme, selected }) =>
    selected ? theme.color["Colors/Text/text-brand-primary (900)"] : "inherit"};

  &:hover {
    background-color: ${({ theme }) =>
      theme.color["Colors/Background/bg-quaternary"]};
  }
`

const chevronStyle = css`
  position: relative;
  font-size: 12px;
  color: ${({ theme }) => theme.color["Colors/Text/text-quaternary_on-brand"]};
  margin-left: ${({ theme }) => theme.spacing.xl};
`
const AlignedUp = styled(FaChevronUp)`
  ${chevronStyle}
`
const AlignedDown = styled(FaChevronDown)`
  ${chevronStyle}
`
const Check = styled(FaCheck)`
  ${chevronStyle}
`

interface Props<T extends string> {
  selectedOption?: T
  options: readonly T[]
  onSelectionChange: (selection: T) => void
}

export const DropdownMenu = <T extends string>({
  selectedOption,
  options,
  onSelectionChange,
}: Props<T>) => {
  const ref = useRef<HTMLDivElement>(null)
  const { displayMenu, setDisplayMenu } = usePopUpMenu(ref)
  const [selected, setSelected] = useState(selectedOption ?? options[0])
  const toggleOpenCloseState = () => setDisplayMenu(!displayMenu)

  useEffect(() => {
    if (selectedOption) {
      setSelected(selectedOption)
    }
  }, [selectedOption])

  const handleSelection = (option: T) => {
    setSelected(option)
    onSelectionChange(option)
  }

  return (
    <DropdownLayout onClick={toggleOpenCloseState}>
      <div>{selected}</div>
      <div>{displayMenu ? <AlignedUp /> : <AlignedDown />}</div>
      {displayMenu && (
        <DropdownOptions ref={ref}>
          {options.map((option) => (
            <DropdownOption
              key={option}
              onClick={() => handleSelection(option)}
              selected={selected === option}
            >
              {option}
              {selected === option && <Check />}
            </DropdownOption>
          ))}
        </DropdownOptions>
      )}
    </DropdownLayout>
  )
}

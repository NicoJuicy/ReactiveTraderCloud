/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { rgba } from "polished"
import { ReactNode } from "react"
import styled, {
  css,
  FlattenSimpleInterpolation,
  StyledComponent,
} from "styled-components"

import {
  AccentPaletteMap,
  colors,
  Theme,
  ThemeName,
  useTheme,
} from "@/client/theme"

import { H2, H3 } from "../elements"
import { Block, BlockProps, Paragraph, SectionBlock, Text } from "../styled"

const { primary, ...others } = colors.accents

export const CoreBranding = () => {
  const { themeName } = useTheme()

  return (
    <>
      <SectionBlock colorScheme="secondary" mh={2}>
        <H2 pt={2}>COLOUR</H2>
        <H3>Core UI</H3>
        <Paragraph>
          Core color control the general look and feel of the application and
          make up 90% of the overall UI aesthetic. When switching from a light
          to a dark theme these are the key color that change.
        </Paragraph>

        <ThemePalettes
          theme={themeName === ThemeName.Dark ? colors.dark : colors.light}
        />

        <Separator />

        <QuadrantLayout>
          <span>
            <H3>Brand / Accent Colours</H3>
            <Paragraph mb={0} pr={3}>
              Brand colors aim to communicate a companies visual ownership of
              the digital product.
            </Paragraph>
          </span>
          <DominantAccentPalettes dominant={primary} />
        </QuadrantLayout>

        <Separator />

        <QuadrantLayout>
          <span>
            <H3>Accents & Functional colors</H3>
            <Paragraph mb={3} pr={3}>
              Accent colors inject focus points in to the UI and are used to
              give the UI character and guide users attention. These colors
              often work with the brand helping to retain the ‘feeling’ of being
              from the same organisation but not always.
            </Paragraph>
          </span>

          <AccentPalettes accents={others} />
        </QuadrantLayout>

        <Separator />

        <QuadrantLayout>
          <span>
            <H3>Unique Collections</H3>
            <Paragraph pr={3}>
              Create separate references for key areas of the application such
              as trading directions.
            </Paragraph>
            <Paragraph pr={3}>
              <i>
                Note: Why are some colours the same but named differently?
                Answer: These colours will be chosen and used in different
                situations allowing key functional colours and branding to be
                changed independantly of one another.
              </i>
            </Paragraph>
          </span>

          <span>
            <UniquePalettes
              palettes={{
                "Trading-Sell": {
                  base: colors.spectrum.uniqueCollections.Sell.base,
                  1: colors.spectrum.uniqueCollections.Sell.lighter,
                  2: colors.spectrum.uniqueCollections.Sell.darker,
                },
              }}
            />
            <UniquePalettes
              palettes={{
                "Trading-Buy": {
                  base: colors.spectrum.uniqueCollections.Buy.base,
                  1: colors.spectrum.uniqueCollections.Buy.lighter,
                  2: colors.spectrum.uniqueCollections.Buy.darker,
                },
              }}
            />
          </span>
        </QuadrantLayout>
      </SectionBlock>
    </>
  )
}

const Separator = styled.div`
  height: 2px;
  background-color: ${({ theme }) => theme.core.primaryStyleGuideBackground};
`

const PaletteLayout = ({
  grid: SwatchGrid,
  fg,
  label: paletteLabel,
  palette,
  include = ["base", 1, 2, 3, 4, 5],
  codes = {},
}: {
  grid?: StyledComponent<React.ComponentType<any>, Theme, any>
  fg: string
  label: string
  palette: any
  include?: any[]
  codes?: object
}) => {
  if (!SwatchGrid) {
    return <></>
  }
  return (
    <SwatchGrid style={{ boxShadow: `0px 0px 20px 0px ${rgba(0, 0, 0, 0.2)}` }}>
      {include.map((key, i) => {
        const color = palette[key]

        const themeForCss: any = {
          justifyContent: "center",
        }

        if (key === "base") {
          themeForCss.gridArea = key
        }

        if (key === 1) {
          themeForCss.gridArea = "base1"
        }

        return (
          <Swatch
            key={key}
            extra={css(themeForCss)}
            label={`${paletteLabel} ${key === "base" ? "" : `-${i}`}`}
            value={color}
            // @ts-ignore
            code={codes[key] || key}
            bg={() => color}
            fg={() => fg}
          />
        )
      })}
    </SwatchGrid>
  )
}

export interface SwatchColorProps {
  extra?: FlattenSimpleInterpolation
}

export interface SwatchProps extends BlockProps, SwatchColorProps {
  className?: string
  style?: object
  is?: StyledComponent<React.ComponentType<any>, Theme, SwatchColorProps>
  label?: string
  value?: string
  code?: string
  toStyle?: React.CSSProperties
  extra?: FlattenSimpleInterpolation
  children?: ReactNode
}

export const Swatch = ({
  is: SwatchElement = SwatchColor,
  label,
  value,
  bg,
  fg,
  ...props
}: SwatchProps) => (
  <SwatchElement p={1} bg={bg} fg={fg} {...props}>
    <Text fontSize={0.75} fontWeight="bold" textTransform="capitalize">
      {label}
    </Text>
    <Text fontSize={0.75} textTransform="uppercase">
      {value}
    </Text>
  </SwatchElement>
)

export const SwatchColor = styled(Block)<SwatchColorProps>`
  line-height: 1.25rem;

  display: flex;
  justify-content: flex-end;
  flex-flow: column nowrap;
  padding-right: 5px;

  ${({ extra }) => extra};
`

export const LargeSwatchColor = styled(SwatchColor)<SwatchColorProps>`
  width: 14rem;
  height: 10rem;
  margin: 1.5rem 0;

  display: flex;
  justify-content: flex-end;
  flex-flow: column nowrap;

  border-radius: 0.5rem;
`

const CoreSwatchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 5rem);
  grid-template-areas:
    "base 2"
    "base 3"
    "base1 4"
    "base1 5";

  overflow: hidden;
  border-radius: 0.5rem;

  ${SwatchColor} {
    border-radius: initial;
  }

  @media all and (min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 10rem 7rem;
    grid-template-areas:
      "base base base1 base1"
      "2 3 4 5";
  }
`

const ThemePalettes = ({ theme: { primary, secondary } }: { theme: any }) => {
  return (
    <ThemeRow>
      <PaletteLayout
        grid={CoreSwatchGrid}
        label="Core-Primary"
        palette={primary}
        fg={secondary.base}
      />
      <PaletteLayout
        grid={CoreSwatchGrid}
        label="Core-Secondary"
        palette={secondary}
        fg={primary.base}
      />
    </ThemeRow>
  )
}

const ThemeRow = styled.div`
  margin: 2rem 0;

  display: grid;
  grid-gap: 0.5rem;
  @media all and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;

    ${CoreSwatchGrid}:first-child {
      border-radius: 0.5rem 0.5rem 0.5rem 0.5rem !important;
    }

    ${CoreSwatchGrid}:last-child {
      border-radius: 0.5rem 0.5rem 0.5rem 0.5rem !important;
    }
  }
`

const QuadrantLayout = styled.div`
  margin: 30px 0px;
  display: grid;
  grid-row-gap: 1rem;
  grid-column-gap: 0.5rem;

  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;

  @media all and (max-width: 800px) {
    grid-template-columns: auto;
  }
`

const DominantAccentPalettes = ({ dominant }: { dominant: object }) => {
  return (
    <AccentRowGrid>
      <PaletteLayout
        key="dominant"
        grid={DominantAccentSwatchGrid}
        label="Accent-Primary"
        palette={dominant}
        fg="#FFF"
        include={["base", "darker", "lighter"]}
      />
    </AccentRowGrid>
  )
}

const AccentPalettes = ({
  accents,
}: {
  accents: Omit<AccentPaletteMap, "primary">
}) => {
  return (
    <AccentRowGrid>
      {Object.keys(accents).map((accentName) => (
        <PaletteLayout
          key={accentName}
          grid={AccentSwatchGrid}
          label={`Accent-${accentName}`}
          palette={accents[accentName as "positive" | "aware" | "negative"]}
          fg="#000"
          include={["base", "darker", "medium", "lighter"]}
        />
      ))}
    </AccentRowGrid>
  )
}

const AccentRowGrid = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr;
  grid-template-rows: 6rem;
`

const AccentSwatchGrid = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  display: grid;
  grid-template-rows: 6rem;
  grid-template-areas: "base darker medium lighter";
`

const DominantAccentSwatchGrid = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: 49% 26% 25%;
  grid-template-areas: "base darker lighter";
`

const UniquePalettes = ({ palettes }: { palettes: any }) => {
  return (
    <UniqueRowGrid>
      {Object.keys(palettes).map((label) => (
        <PaletteLayout
          key={label}
          grid={UniqueSwatchGrid}
          label={label}
          palette={palettes[label]}
          fg="#000"
          include={["base", "1", "2"]}
        />
      ))}
    </UniqueRowGrid>
  )
}

const UniqueRowGrid = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 75%;
  margin-bottom: 1rem;
`

const UniqueSwatchGrid = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  height: min-content;
  display: grid;
  grid-template-rows: 6rem;
  grid-template-columns: 40% 30% 30%;
  grid-template-areas: "base 1 2";
`

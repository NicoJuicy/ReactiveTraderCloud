import { Subscribe } from "@react-rxjs/core"
import React from "react"

import { LayoutProps } from "../types"
import { RegionLayout } from "./RegionLayout"

export const Region = ({
  source$,
  fallback,
  children,
  ...props
}: LayoutProps & React.ComponentProps<typeof Subscribe>) => {
  return (
    <Subscribe source$={source$} fallback={fallback}>
      {children}
      <RegionLayout {...props} />
    </Subscribe>
  )
}

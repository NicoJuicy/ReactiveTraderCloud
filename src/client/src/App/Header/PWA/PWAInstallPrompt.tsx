import { Dispatch, SetStateAction, useEffect } from "react"

import { CrossIcon } from "@/components/icons"
import { isiOS, isMobileDevice, isPWA } from "@/utils"

import { PWAInstallModal } from "./PWAInstallModal"
import {
  BannerText,
  CrossButton,
  InstallButton,
  MainBanner,
} from "./PWAInstallPrompt.styles"
import { usePWABannerPrompt } from "./usePWABannerPrompt"

export enum PWABanner {
  Shown = "shown",
  Hidden = "hidden",
  NotSet = "notset",
  Installed = "installed",
}

interface InstallBannerProps {
  banner: string | null
  updateBanner: (state: PWABanner) => void
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const PWAInstallBanner = ({
  banner,
  updateBanner,
  isModalOpen,
  setIsModalOpen,
}: InstallBannerProps) => {
  const [prompt, promptToInstall] = usePWABannerPrompt()

  const isHidden = banner !== PWABanner.Shown || (!prompt && !isiOS) || isPWA()

  useEffect(() => {
    if (prompt && banner === PWABanner.NotSet) {
      updateBanner(PWABanner.Shown)
    } else if (isiOS && banner === PWABanner.NotSet) {
      updateBanner(PWABanner.Shown)
    }
  }, [prompt, banner, updateBanner])

  useEffect(() => {
    const handler = () => {
      updateBanner(PWABanner.Installed)
    }

    window.addEventListener("appinstalled", handler)

    return () => window.removeEventListener("appinstalled", handler)
  }, [updateBanner])

  const closeBanner = () => {
    updateBanner(PWABanner.Hidden)
  }

  const installPWA = (isiOS: boolean) => {
    if (isiOS) {
      setIsModalOpen(true)
    } else {
      promptToInstall()
    }
  }

  if (isModalOpen) {
    return <PWAInstallModal closeModal={() => setIsModalOpen(false)} />
  }

  return (
    <MainBanner isHidden={isHidden}>
      <CrossButton onClick={closeBanner}>{CrossIcon}</CrossButton>
      <BannerText>
        {isMobileDevice
          ? "Experience Reactive Trader® as an app!"
          : "Experience Reactive Trader® on your desktop!"}
      </BannerText>
      <InstallButton onClick={() => installPWA(isiOS)}>Install</InstallButton>
    </MainBanner>
  )
}

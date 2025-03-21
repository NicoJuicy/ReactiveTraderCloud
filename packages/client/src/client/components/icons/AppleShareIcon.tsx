import { ReactiveTraderIcon } from "./types"

export const AppleShareIcon = ({
  width = 22,
  height = 23,
}: ReactiveTraderIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 22 23"
  >
    <g fill="none" fillRule="evenodd" transform="translate(0 .5)">
      <circle cx="11" cy="11" r="11" fill="#5F94F5" />
      <path
        fill="#FFF"
        fillRule="nonzero"
        d="M9.959 7.562v.894H6.937v7.65h8.125v-7.65h-3.02v-.894H16V17H6V7.562h3.959zm.864-3.467c.114-.112.292-.124.423-.04l.054.044.213.216.02.028.02.042 1.865 1.758c.098.095.12.233.069.351l-.032.058-.045.052-.202.182c-.113.111-.29.127-.419.046l-.051-.041-1.27-1.197.001 6.897h-.938V5.66L9.38 6.76c-.099.096-.244.119-.366.07l-.059-.032-.053-.042-.187-.19c-.113-.11-.13-.279-.044-.406l.043-.051 2.109-2.014z"
      />
    </g>
  </svg>
)

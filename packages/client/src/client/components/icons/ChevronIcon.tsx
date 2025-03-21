import { ReactiveTraderIcon } from "./types"

export const ChevronIcon = ({
  width = 24,
  height = 24,
}: ReactiveTraderIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M14.64 10.16c.22-.213.58-.213.8 0 .222.214.222.56 0 .774l-3.236 3.125c-.221.213-.58.213-.801 0l-3.237-3.125c-.221-.214-.221-.56 0-.774.221-.213.58-.213.801 0l2.838 2.74 2.834-2.74z"
    />
  </svg>
)

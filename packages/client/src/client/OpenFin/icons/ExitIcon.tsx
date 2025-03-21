interface Props {
  width?: number
  height?: number
}

export const ExitIcon = ({ width = 24, height = 24 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path
      d="M16.003 7.627a.5.5 0 0 1 .04.707l-3.037 3.39 3.036 3.392a.5.5 0 0 1 .023.64l-.062.066a.5.5 0 0 1-.706-.039l-2.963-3.309-2.961 3.31a.5.5 0 0 1-.746-.668l3.036-3.392-3.036-3.39a.5.5 0 0 1-.022-.64l.061-.067a.5.5 0 0 1 .707.04l2.962 3.308 2.962-3.309a.5.5 0 0 1 .706-.039z"
      fill="currentColor"
    />
  </svg>
)

export function DoraemonFlat({
  size = 60,
  mood = 'idle',
  paused = false
}: {
  size?: number
  mood?: string
  paused?: boolean
}): React.JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`Doraemon: ${mood}`}
      className="bm-doraemon-flat"
      data-paused={paused || undefined}
    >
      <g className="bm-doraemon-figure">
        <ellipse cx="32" cy="58" rx="16" ry="3" fill="currentColor" opacity="0.12" />
        <ellipse cx="32" cy="45" rx="14" ry="13" fill="#0096e6" />
        <ellipse cx="25" cy="57" rx="9" ry="4" fill="white" />
        <ellipse cx="40" cy="57" rx="9" ry="4" fill="white" />
        <ellipse cx="32" cy="44" rx="10" ry="9" fill="white" />
        <path
          d="M25 44H39Q38 52 32 52Q26 52 25 44Z"
          fill="none"
          stroke="#303030"
          strokeWidth="0.8"
        />
        <circle cx="32" cy="25" r="20" fill="#0096e6" />
        <ellipse cx="32" cy="29" rx="17" ry="15" fill="white" />
        <ellipse cx="27" cy="18" rx="5" ry="7" fill="white" stroke="#303030" strokeWidth="0.7" />
        <ellipse cx="37" cy="18" rx="5" ry="7" fill="white" stroke="#303030" strokeWidth="0.7" />
        <g fill="#222222">
          <ellipse cx="29" cy="20" rx="1.6" ry="3" />
          <ellipse cx="35" cy="20" rx="1.6" ry="3" />
        </g>
        <circle cx="32" cy="26" r="3.3" fill="#e60012" />
        <circle cx="31" cy="25" r="0.9" fill="white" />
        <path
          d="M32 29V36M21 34Q32 47 43 34M17 28L25 30M16 33H24M18 38L25 35M47 28L39 30M48 33H40M46 38L39 35"
          fill="none"
          stroke="#303030"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path d="M21 42H43" stroke="#e60012" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="43" r="3.5" fill="#ffd447" stroke="#b58c20" strokeWidth="0.7" />
        <circle cx="17" cy="46" r="4.5" fill="white" />
        <circle cx="47" cy="46" r="4.5" fill="white" />
        <path d="M32 7V2M23 2H41" stroke="#e6b12b" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

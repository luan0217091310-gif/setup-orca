import { useCornerSettings } from '@/components/binhminh-corner/use-corner-settings'

export function BinhMinhSignature(): React.JSX.Element {
  const { displayName } = useCornerSettings()
  return (
    <svg className="deck-signature" viewBox="0 0 164 48" role="img" aria-label={displayName}>
      <text
        x="8"
        y="29"
        fill="currentColor"
        fontFamily="'Segoe Script', 'Brush Script MT', cursive"
        fontSize="21"
        textLength={displayName.length > 12 ? 148 : undefined}
        lengthAdjust="spacingAndGlyphs"
      >
        {displayName}
      </text>
      <path
        d="M14 39C52 34 98 34 146 35M128 30L154 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

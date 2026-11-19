import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store'

export function QuotaCardActions({
  missingAntigravity
}: {
  missingAntigravity: boolean
}): React.JSX.Element {
  const refresh = useAppStore((state) => state.refreshRateLimits)
  const antigravity = useAppStore((state) => state.rateLimits.antigravity)
  const [pending, setPending] = useState(false)
  const attempted = useRef(false)
  useEffect(() => {
    if (!missingAntigravity || attempted.current) return
    attempted.current = true
    void refresh()
  }, [missingAntigravity, refresh])
  const refreshUsage = async (): Promise<void> => {
    setPending(true)
    try {
      await refresh()
    } finally {
      setPending(false)
    }
  }
  const failure = antigravity?.usageMetadata?.failureKind
  const message =
    pending || antigravity?.status === 'fetching'
      ? 'Đang đọc hạn mức…'
      : failure === 'cli-unavailable'
        ? 'Chưa tìm thấy AGY. Mở lại Orca bằng biểu tượng Orca Huu Luan.'
        : failure === 'missing-credentials' || failure === 'stale-token'
          ? 'Cần đăng nhập lại Antigravity.'
          : 'Chưa có số liệu. Bấm Cập nhật để đọc hạn mức.'
  return (
    <div className="space-y-1.5 px-2.5 py-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium bm-t3">Hạn mức</span>
        <Button
          variant="ghost"
          size="xs"
          disabled={pending}
          aria-label="Cập nhật hạn mức"
          aria-busy={pending}
          onClick={() => void refreshUsage()}
        >
          {pending ? 'Đang tải…' : 'Cập nhật'}
        </Button>
      </div>
      {missingAntigravity ? (
        <div className="space-y-0.5" role="status">
          <p className="text-[12px] font-medium bm-t1">Antigravity</p>
          <p className="text-[11px] bm-t3">{message}</p>
        </div>
      ) : null}
    </div>
  )
}

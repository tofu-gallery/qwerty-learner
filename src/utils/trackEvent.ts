// Modified by Tofu on 2026-10-23: promotion interactions must not send telemetry.
import noop from '@/utils/noop'

export const trackPromotionEvent: (event: string, properties: Record<string, string>) => void = noop

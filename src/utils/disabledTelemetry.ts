// Added by Tofu on 2026-10-23, under GPL-3.0.
// Keeps upstream's telemetry call sites inert; learning records still use IndexedDB.
import noop from '@/utils/noop'

type Track = (event: string, properties: Record<string, unknown>) => void

const disabledTelemetry: { track: Track } = { track: noop }

export default disabledTelemetry

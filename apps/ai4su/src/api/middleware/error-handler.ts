import type { ErrorHandler } from 'hono'

export const errorHandler: ErrorHandler = (err, c) => {
  // Duck-type check for AppError (instanceof can fail across module boundaries)
  if ('code' in err && 'status' in err && typeof (err as { status: number }).status === 'number') {
    const appErr = err as { code: string; status: number; message: string }
    return c.json(
      { success: false, error: { code: appErr.code, message: appErr.message } },
      appErr.status as 400 | 404 | 500,
    )
  }

  console.error('Unhandled error:', err)
  return c.json(
    { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
    500,
  )
}

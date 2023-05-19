declare module 'react-credit-card-input'
interface RequestHookType<T = any> {
    loading?: 'false' | 'true' | 'done'
    error?: boolean
    errorMessage?: string
    data?: T | null
}

interface API_RESPONSE {
    status?: boolean
    message?: string
    data?: any
}

interface DEFAULT_RESPONSE {
    error?: boolean
    errorMessage?: string
    data?: any
}
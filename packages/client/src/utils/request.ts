export interface RequestOptions {
    method: string
    headers?: {
        Authorization?: string
        'Content-Type': string
    }
    body?: string | FormData
}

export const request = async (url: string, options?: RequestOptions) => {
    return await fetch(url, options)
}

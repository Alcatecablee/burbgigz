import { supabase, isSupabaseAvailable } from './supabase'

export interface ApiClientConfig {
  baseUrl?: string
  defaultHeaders?: Record<string, string>
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || '/api'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.defaultHeaders
    }
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    if (!isSupabaseAvailable()) {
      return {}
    }

    try {
      const { data: { session }, error } = await supabase!.auth.getSession()
      
      if (error || !session?.access_token) {
        return {}
      }

      return {
        'Authorization': `Bearer ${session.access_token}`
      }
    } catch (error) {
      console.warn('Failed to get auth headers:', error)
      return {}
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const authHeaders = await this.getAuthHeaders()
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      credentials: 'include',
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...authHeaders,
        ...options.headers
      }
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorBody = await response.text()
      let errorMessage = `Request failed: ${response.status} ${response.statusText}`
      
      try {
        const errorJson = JSON.parse(errorBody)
        errorMessage = errorJson.error || errorMessage
      } catch {
        // If response is not JSON, use the text as error message if available
        if (errorBody) {
          errorMessage = errorBody
        }
      }
      
      throw new Error(errorMessage)
    }

    // Handle empty responses (like DELETE operations)
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return null as T
    }

    return response.json()
  }

  // Generic HTTP methods
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  // File upload method (multipart/form-data)
  async uploadFile<T>(endpoint: string, formData: FormData, options?: RequestInit): Promise<T> {
    const authHeaders = await this.getAuthHeaders()
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      credentials: 'include',
      ...options,
      method: 'POST',
      headers: {
        ...authHeaders,
        ...options?.headers
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorBody = await response.text()
      let errorMessage = `Upload failed: ${response.status} ${response.statusText}`
      
      try {
        const errorJson = JSON.parse(errorBody)
        errorMessage = errorJson.error || errorMessage
      } catch {
        if (errorBody) {
          errorMessage = errorBody
        }
      }
      
      throw new Error(errorMessage)
    }

    return response.json()
  }

  // File download method
  async downloadFile(endpoint: string, filename?: string): Promise<void> {
    const authHeaders = await this.getAuthHeaders()
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      credentials: 'include',
      headers: authHeaders
    })
    
    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`)
    }

    // Get filename from response headers or use provided filename
    const contentDisposition = response.headers.get('Content-Disposition')
    const responseFilename = contentDisposition 
      ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') 
      : filename || 'download'

    const blob = await response.blob()
    const url2 = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url2
    a.download = responseFilename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url2)
    document.body.removeChild(a)
  }
}

// Create and export default API client instance
export const api = new ApiClient()

// Export the class for creating custom instances if needed
export { ApiClient }
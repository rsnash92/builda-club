import { useState, useEffect } from 'react'
import { Club } from '@/lib/database/types'

interface UseClubsOptions {
  category?: string
  search?: string
  limit?: number
  offset?: number
  enabled?: boolean
}

interface UseClubsReturn {
  clubs: Club[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useClubs(options: UseClubsOptions = {}): UseClubsReturn {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { category, search, limit, offset, enabled = true } = options

  const fetchClubs = async () => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (search) params.append('search', search)
      if (limit) params.append('limit', limit.toString())
      if (offset) params.append('offset', offset.toString())

      const response = await fetch(`/api/clubs?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch clubs')
      }

      const data = await response.json()
      setClubs(data.clubs || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching clubs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClubs()
  }, [category, search, limit, offset, enabled])

  return {
    clubs,
    loading,
    error,
    refetch: fetchClubs
  }
}

export function useHotClubs(limit: number = 6) {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHotClubs = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/clubs/hot?limit=${limit}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch hot clubs')
      }

      const data = await response.json()
      setClubs(data.clubs || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching hot clubs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHotClubs()
  }, [limit])

  return {
    clubs,
    loading,
    error,
    refetch: fetchHotClubs
  }
}

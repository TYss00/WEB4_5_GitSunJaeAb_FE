import { useState, useCallback } from 'react'

export default function useHashtags() {
  const [hashtagInput, setHashtagInput] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])

  const addHashtag = useCallback(() => {
    const trimmed = hashtagInput.trim()
    if (trimmed && !hashtags.includes(trimmed)) {
      setHashtags((prev) => [...prev, trimmed])
    }
    setHashtagInput('')
  }, [hashtagInput, hashtags])

  const deleteHashtag = useCallback((tag: string) => {
    setHashtags((prev) => prev.filter((t) => t !== tag))
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') addHashtag()
    },
    [addHashtag]
  )

  return {
    hashtagInput,
    setHashtagInput,
    hashtags,
    addHashtag,
    deleteHashtag,
    handleKeyDown,
  }
}

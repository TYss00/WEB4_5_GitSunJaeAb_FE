import { useState, useCallback } from 'react'
type Hashtag = {
  name: string
}
export default function useHashtags() {
  const [hashtagInput, setHashtagInput] = useState('')
  const [hashtags, setHashtags] = useState<Hashtag[]>([])

  const addHashtag = useCallback(() => {
    const trimmed = hashtagInput.trim()
    if (trimmed && !hashtags.some((tag) => tag.name === trimmed)) {
      setHashtags((prev) => [...prev, { name: trimmed }])
    }
    setHashtagInput('')
  }, [hashtagInput, hashtags])

  const deleteHashtag = useCallback((tag: string) => {
    setHashtags((prev) => prev.filter((t) => t.name !== tag))
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

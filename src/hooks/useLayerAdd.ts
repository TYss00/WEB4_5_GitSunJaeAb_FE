import { useState } from 'react'

export default function useLayerAdd() {
  const [layers, setLayers] = useState<string[]>([])
  const [newLayerName, setNewLayerName] = useState('')

  const handleAddLayer = () => {
    const trimmed = newLayerName.trim()
    if (!trimmed) return

    setLayers((prev) => [...prev, trimmed])
    setNewLayerName('')
  }

  const handleDeleteLayer = (index: number) => {
    setLayers((prev) => prev.filter((_, i) => i !== index))
  }
  return {
    layers,
    setLayers,
    newLayerName,
    setNewLayerName,
    handleAddLayer,
    handleDeleteLayer,
  }
}

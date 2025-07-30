'use client'

import { LayerEditProps, MarkerData } from '@/types/type'
import { ChevronDown, ChevronUp, Layers, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import MarkerUpdate from './MarkerUpdate'

export default function LayerUpdate({
  title,
  defaultOpen = false,
  markers = [],
  deleteMarker,
  onDelete,
  addMarkerByAddress,
  updateMarkerData,
  addManualMarker,
  onUpdateLayerTitle,
}: LayerEditProps & {
  updateMarkerData: (
    layerName: string,
    markerId: number,
    updatedFields: Partial<MarkerData>
  ) => void
  addManualMarker: (layer: string) => void
  onUpdateLayerTitle: (oldName: string, newName: string) => void
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const handleTitleSubmit = () => {
    if (editedTitle.trim() && editedTitle !== title) {
      onUpdateLayerTitle(title, editedTitle.trim())
    }
    setIsEditingTitle(false)
  }
  return (
    <>
      <div className="w-full">
        <div
          className={`flex justify-between px-[15px] h-[55px]  cursor-pointer transition-colors ${
            isOpen
              ? 'bg-[#EBF2F2] rounded-t-[5px]'
              : 'bg-[var(--gray-40)] rounded-[5px]'
          }`}
        >
          <div className="flex gap-[10px] items-center">
            <Layers
              size={24}
              color={`${isOpen ? 'var(--primary-300)' : 'black'}`}
            />
            {isEditingTitle ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTitleSubmit()
                  }
                }}
                autoFocus
                className="text-[18px] text-[var(--primary-300)] bg-transparent border-b border-[var(--primary-300)] outline-none"
              />
            ) : (
              <span
                className={`text-[18px] cursor-pointer ${
                  isOpen ? 'text-[var(--primary-300)]' : 'text-[var(--black)]'
                }`}
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </span>
            )}
          </div>
          <div className="flex gap-[10px] items-center">
            <Trash2 size={18} color="red" onClick={onDelete} />
            {isOpen ? (
              <ChevronUp size={24} onClick={() => setIsOpen((prev) => !prev)} />
            ) : (
              <ChevronDown
                size={24}
                onClick={() => setIsOpen((prev) => !prev)}
              />
            )}
          </div>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen
              ? 'max-h-[633px] bg-[#EBF2F2] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-[10px] max-h-[633px] overflow-y-auto rounded-b-[5px] flex flex-col gap-[15px]">
            {markers.map((marker) => (
              <MarkerUpdate
                key={marker.id}
                id={marker.id ?? Date.now()}
                isTextArea={true}
                address={marker.address}
                name={marker.name}
                description={marker.description}
                onDelete={() => deleteMarker(title, marker.id ?? Date.now())}
                onAddByAddress={(address) => {
                  addMarkerByAddress(title, address)
                }}
                onChangeName={(id, name) =>
                  updateMarkerData(title, id, { name })
                }
                onChangeDescription={(id, description) =>
                  updateMarkerData(title, id, { description })
                }
              />
            ))}

            <div
              onClick={() => addManualMarker(title)}
              className="w-full min-h-[44px] flex justify-center items-center rounded-[5px] bg-[var(--primary-100)] cursor-pointer"
            >
              <Plus size={24} color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

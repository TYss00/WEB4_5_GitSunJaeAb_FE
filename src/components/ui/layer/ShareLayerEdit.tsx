'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Layers, Plus, Trash2 } from 'lucide-react';
import ShareMarkerEdit from './ShareMarkerEdit';
import { ShareLayerEditProps } from '@/types/type';
import useShareStore from '@/store/useShareStore';
import { Layer } from '@/types/share';

export default function ShareLayerEdit({
  layer,
  isTextArea = true,
  defaultOpen = true,
  mapRef,
}: ShareLayerEditProps & {
  mapRef: React.RefObject<google.maps.Map | null>;
  layer: Layer;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [markerUIs, setMarkerUIs] = useState([{ id: 1 }]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(layer.name);

  const addMarker = () => {
    setMarkerUIs((prev) => [...prev, { id: Date.now() }]);
  };

  const removeMarker = useShareStore((state) => state.removeMarker);
  const markers = useShareStore((state) => state.markers);
  const layerId = layer.layerTempId;
  const removeLayer = useShareStore((state) => state.removeLayer);
  const renameLayer = useShareStore((state) => state.renameLayer);

  const handleRename = () => {
    renameLayer(layer.layerTempId, name.trim() || '레이어');
    setIsEditing(false);
  };

  const layerMarkers = Object.values(markers).filter(
    (m) => m.layerTempId === layerId
  );

  return (
    <div className="w-full">
      <div
        className={`flex justify-between px-[15px] h-[55px] cursor-pointer transition-colors ${
          isOpen
            ? 'bg-[#EBF2F2] rounded-t-[5px]'
            : 'bg-[var(--gray-40)] rounded-[5px]'
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex gap-[10px] items-center">
          <Layers
            size={24}
            color={`${isOpen ? 'var(--primary-300)' : 'black'}`}
          />
          <span
            className={`text-[18px] ${
              isOpen ? 'text-[var(--primary-300)]' : 'text-[var(--black)]'
            }`}
          >
            {isEditing ? (
              <input
                autoFocus
                className="text-[18px] bg-transparent border-b border-[var(--primary-300)] focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename();
                }}
                onBlur={handleRename}
              />
            ) : (
              <span
                className={`text-[18px] ${
                  isOpen ? 'text-[var(--primary-300)]' : 'text-[var(--black)]'
                } cursor-pointer`}
                onClick={() => setIsEditing(true)}
              >
                {layer.name}
              </span>
            )}
          </span>
        </div>
        <div className="flex gap-[10px] items-center">
          <Trash2
            size={18}
            color="red"
            onClick={() => {
              if (confirm('이 레이어를 삭제하시겠습니까?')) {
                removeLayer(layerId);
              }
            }}
            className="cursor-pointer"
          />
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
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
          {layerMarkers.map((marker) => (
            <ShareMarkerEdit
              key={marker.markerTempId}
              isTextArea={isTextArea}
              mapRef={mapRef}
              marker={marker}
              onDelete={() => removeMarker(marker.markerTempId)}
            />
          ))}

          {markerUIs.map((marker) => (
            <ShareMarkerEdit
              key={marker.id}
              isTextArea={isTextArea}
              mapRef={mapRef}
              onDelete={() =>
                setMarkerUIs((prev) => prev.filter((m) => m.id !== marker.id))
              }
            />
          ))}

          <div
            onClick={addMarker}
            className="w-full min-h-[44px] flex justify-center items-center rounded-[5px] bg-[var(--primary-100)] cursor-pointer"
          >
            <Plus size={24} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}

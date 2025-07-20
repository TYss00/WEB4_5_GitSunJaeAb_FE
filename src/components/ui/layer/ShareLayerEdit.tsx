// ✅ ShareLayerEdit.tsx (최종 통합 버전)
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Layers, Plus, Trash2 } from 'lucide-react';
import ShareMarkerEdit from './ShareMarkerEdit';
import { LayerEditProps } from '@/types/type';
import useStore from '@/store/useStore';

export default function ShareLayerEdit({
  title = '공유 레이어',
  isTextArea = true,
  defaultOpen = true,
  mapRef,
}: LayerEditProps & {
  mapRef: React.RefObject<google.maps.Map | null>;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [markerUIs, setMarkerUIs] = useState([{ id: 1 }]);
  const addMarker = () => {
    setMarkerUIs((prev) => [...prev, { id: Date.now() }]);
  };

  const removeMarker = useStore((state) => state.removeMarker);
  const markers = useStore((state) => state.markers);
  const layerId = title.split(' ')[1];

  const layerMarkers = Object.values(markers).filter(
    (m) => m.layer === layerId
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
            {title}
          </span>
        </div>
        <div className="flex gap-[10px] items-center">
          <Trash2 size={18} color="red" />
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
              key={marker.id}
              isTextArea={isTextArea}
              mapRef={mapRef}
              marker={marker}
              onDelete={() => removeMarker(marker.id)}
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

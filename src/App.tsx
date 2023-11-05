import Header from "@components/Header/Header";
import Photo from "@components/Photo/Photo";
import { DndContext, closestCenter, DragOverlay, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useGetAllPhotosQuery } from "@redux/features/photos/photos.api";
import { useEffect, useState } from "react";

// Handler for when a drag starts
const handleDragStart = ({ active: { id } }: DragStartEvent) => {};

// Handler for when a drag ends
const handleDragEnd = ({ active, over }: DragEndEvent) => {};

const handleDragCancel = () => {};

const App = () => {
  const [items, setItems] = useState<string[]>([]);
  const {
    data: getAllPhotosRes,
    isLoading,
    isError,
    error,
  } = useGetAllPhotosQuery();

  useEffect(() => {
    if (getAllPhotosRes) setItems(Object.keys(getAllPhotosRes ?? {}) ?? []);
  }, [getAllPhotosRes]);

  return (
    <div>
      <Header />
      <div className="grid">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {/* Sortable context for rearranging items */}
            <div className="grid">
              <Photo index={0} url=""/>
            </div>
        </DndContext>
      </div>
    </div>
  );
};

export default App;

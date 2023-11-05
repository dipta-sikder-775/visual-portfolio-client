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

  let content: React.ReactNode = null;

  if (!isError && !getAllPhotosRes && isLoading && !error) {
    content = <Loading />;
  }

  if (isError && !getAllPhotosRes && !isLoading && error) {
    content = <Error />;
  }

  if (!isError && getAllPhotosRes && !isLoading && !error) {
    content = (
      <div className="grid">
        {/* Mapping and rendering sorted photos */}
        {items.map((id, index) => (
          <SortablePhoto
            key={id}
            id={id}
            url={getAllPhotosRes?.[id]?.url ?? ""}
            index={index}
          />
        ))}

        {/* Input component for adding new photos */}
        <ImageInput />
      </div>
    );
  }

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
              {content}
            </div>
        </DndContext>
      </div>
    </div>
  );
};

export default App;

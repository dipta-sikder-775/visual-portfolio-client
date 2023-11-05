import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useGetAllPhotosQuery } from "@redux/features/photos/photos.api";
import Header from "@components/Header/Header";
import SortablePhoto from "@components/SortablePhoto/SortablePhoto";
import Photo from "@components/Photo/Photo";
import ImageInput from "@components/ImageInput/ImageInput";
import Loading from "@components/Loading/Loading";
import Error from "@components/Error/Error";

const App = () => {
  const {
    data: getAllPhotosRes,
    isLoading,
    isError,
    error,
  } = useGetAllPhotosQuery();
  const [items, setItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // Fetching photos data and initializing state
  useEffect(() => {
    if (getAllPhotosRes) setItems(Object.keys(getAllPhotosRes ?? {}) ?? []);
  }, [getAllPhotosRes]);

  // Handler for when a drag starts
  const handleDragStart = ({ active: { id } }: DragStartEvent) => {
    setActiveId(id.toString());
  };

  // Handler for when a drag ends
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id && over?.id) {
      setItems((previousItems) => {
        const oldIndex = previousItems.indexOf(active.id.toString());
        const newIndex = previousItems.indexOf(over.id.toString());

        return arrayMove(previousItems, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  // Handler for when a drag is canceled
  const handleDragCancel = () => {
    setActiveId(null);
  };

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
    <div className="container">
      <div className="card">
        <Header />
        {/* DndKit context for drag and drop functionality */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {/* Sortable context for rearranging items */}
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {content}
          </SortableContext>

          {/* Drag overlay for the active dragging photo */}
          <DragOverlay adjustScale={true}>
            {activeId && (
              <Photo
                url={getAllPhotosRes?.[activeId]?.url ?? ""}
                index={items.indexOf(activeId)}
                isDragging
                photoId={activeId}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default App;

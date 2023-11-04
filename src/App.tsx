import Header from "@components/Header/Header";
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

const App = () => {
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

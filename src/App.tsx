import Header from "@components/Header/Header";
import Photo from "@components/Photo/Photo";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";

// Handler for when a drag starts
const handleDragStart = ({ active: { id } }: DragStartEvent) => {};

// Handler for when a drag ends
const handleDragEnd = ({ active, over }: DragEndEvent) => {};

const handleDragCancel = () => {};

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
            <div className="grid">
              <Photo index={0} url=""/>
            </div>

        </DndContext>
      </div>
    </div>
  );
};

export default App;

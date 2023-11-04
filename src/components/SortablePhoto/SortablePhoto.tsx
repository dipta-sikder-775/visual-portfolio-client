import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Photo from "@components/Photo/Photo";

interface ISortablePhotoProps {
  id: string;
  url: string;
  index: number;
}

const SortablePhoto = (props: ISortablePhotoProps) => {
  // Get the sortable attributes and listeners
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  // Apply the transform and transition styles based on dragging state
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    // Render the Photo component with sortable attributes and listeners
    <Photo
      ref={setNodeRef} // Reference to the DOM element
      style={style} // Apply transform and transition styles
      isDragging={isDragging} // Indicate whether the photo is being dragged
      photoId={props.id} // Pass the photo ID
      {...props} // Pass other props
      {...attributes} // Apply sortable attributes
      {...listeners} // Apply sortable listeners
    />
  );
};

export default SortablePhoto;

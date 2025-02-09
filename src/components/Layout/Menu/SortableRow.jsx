import React, { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconButton, ListItem, ListItemText } from "@mui/material/";
import {
  closestCenter,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DndContext,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DragIndicatorOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useStyles } from "./styles";

export default function SortableRow({
  item,
  index,
  setIsEditModalOpend,
  forceDragging = false,
  updateMenuItem,
  lvl,
  parent,
}) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item?.id,
  });

  const classes = useStyles();
  const [activeItem, setActiveItem] = useState(undefined);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const parentStyles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? "0.4" : "1",
    lineHeight: "4",
  };

  const draggableStyles = {
    cursor: isDragging || forceDragging ? "grabbing" : "grab",
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveItem(item.children?.find((item) => item.id === active.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeItem = item.children.find((ex) => ex.id === active.id);
    const overItem = item.children.find((ex) => ex.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = item.children.findIndex((ex) => ex.id === active.id);
    const overIndex = item.children.findIndex((ex) => ex.id === over.id);

    if (activeIndex !== overIndex) {
      const updated = arrayMove(item.children, activeIndex, overIndex).map(
        (ex, i) => ({
          ...ex,
          id: i + 1,
        })
      );
      console.log({ updated });
      //   updateOrder(menu[activeIndex].id, activeIndex, overIndex).then(() => {
      //     dispatch(setMenu(updated));
      //   });
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  return (
    <div ref={setNodeRef} style={parentStyles}>
      <ListItem
        sx={{
          ...(!!lvl && { pl: 4 * lvl }),
          ...(item.visible === false && { opacity: "0.5" }),
        }}
        className={classes.parentItemEditMode}
        style={draggableStyles}
      >
        <IconButton
          sx={{
            ...(item.visible === false && {
              pointerEvents: "none",
            }),
          }}
          className="cancel"
          {...attributes}
          {...listeners}
          ref={setActivatorNodeRef}
        >
          <DragIndicatorOutlined />
        </IconButton>

        <ListItemText primary={item.title} />
        <IconButton
          className="cancel"
          onClick={() => {
            updateMenuItem(
              index,
              "visible",
              item.visible ? false : !item.visible,
              parent
            );
          }}
        >
          {item?.visible === false ? (
            <VisibilityOffOutlined />
          ) : (
            <VisibilityOutlined />
          )}
        </IconButton>
        <IconButton
          sx={{
            ...(item.visible === false && {
              pointerEvents: "none",
            }),
          }}
          className="cancel"
          onClick={() => setIsEditModalOpend({ ...item, index, parent })}
        >
          <EditOutlined />
        </IconButton>
      </ListItem>

      {!!item.children && (
        //
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={item.children.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {item.children.map((subItem, idx) => (
              <SortableRow
                lvl={2}
                index={idx}
                key={subItem.id}
                item={subItem}
                setIsEditModalOpend={setIsEditModalOpend}
                updateMenuItem={updateMenuItem}
                parent={index}
              />
            ))}
          </SortableContext>

          <DragOverlay
            adjustScale={false}
            style={{ transformOrigin: "0 0 ", maxHeight: "65px" }}
          >
            {activeItem ? (
              <SortableRow item={activeItem} forceDragging={true} />
            ) : null}
          </DragOverlay>
        </DndContext>
        //
      )}
    </div>
  );
}

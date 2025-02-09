import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { setMenu } from "../../../store/reducers/mainSlice";
import Collapse from "@mui/material/Collapse";
import { getMenu, updateOrder } from "../../../lib/main";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  Modal,
  TextField,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material/";
import {
  ExpandLess,
  ExpandMore,
  SettingsOutlined,
  HighlightOff,
  CheckCircleOutlined,
  DragIndicatorOutlined,
  KeyboardBackspaceOutlined,
} from "@mui/icons-material";
import { useStyles } from "./styles";
import SortableRow from "./SortableRow";

const Menu = ({ handleCloseDrawer = () => {} }) => {
  const menu = useSelector((state) => state.main.menu);
  const classes = useStyles();
  const [isCollapsedOpend, setIsCollapsedOpend] = React.useState(null);
  const [isEditModalOpend, setIsEditModalOpend] = React.useState(null);
  const [isInEditMode, setisInEditMode] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(undefined);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const handleClick = (index) => {
    isCollapsedOpend === index
      ? setIsCollapsedOpend(null)
      : setIsCollapsedOpend(index);
  };

  useEffect(() => {
    getMenu()
      .then((data) => {
        dispatch(setMenu(data));
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // triggered when dragging starts
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveItem(menu?.find((item) => item.id === active.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeItem = menu.find((ex) => ex.id === active.id);
    const overItem = menu.find((ex) => ex.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = menu.findIndex((ex) => ex.id === active.id);
    const overIndex = menu.findIndex((ex) => ex.id === over.id);

    if (activeIndex !== overIndex) {
      const updated = arrayMove(menu, activeIndex, overIndex).map((ex, i) => ({
        ...ex,
        id: i + 1,
      }));
      console.log({ updated });
      updateOrder(menu[activeIndex].id, activeIndex, overIndex).then(() => {
        dispatch(setMenu(updated));
      });
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  const updateMenuItem = (itemIndex, key, value, parentIndex = null) => {
    const newMenu = Array.from(menu);

    if (parentIndex !== null) {
      const parent = { ...newMenu[parentIndex] };
      const childrens = [...parent["children"]];
      const newObj = { ...childrens[itemIndex] };

      console.log({ newObj });

      newObj[key] = value;
      childrens[itemIndex] = newObj;
      parent["children"] = childrens;
      newMenu[parentIndex] = parent;
    } else {
      const newObj = { ...newMenu[itemIndex] };
      newObj[key] = value;
      newMenu[itemIndex] = newObj;
    }

    console.log({ newMenu });

    dispatch(setMenu(newMenu));
  };

  const EditItemModal = ({ item, updateMenuItem, open, handleClose }) => {
    const [title, setTitle] = useState(item.title);

    const save = () => {
      updateMenuItem(
        item.index,
        "title",
        title,
        item.parent ? item.parent : null
      );
      handleClose();
    };

    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Card>
            <CardContent>
              <TextField
                style={{
                  width: "100%",
                  marginBlock: "10px",
                }}
                label="Update Link title"
                variant="outlined"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <Stack gap={2} direction="row">
                <Button variant="contained" onClick={save}>
                  save
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  discard
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    );
  };

  const handleLongPress = () => {
    timerRef.current = setTimeout(() => {
      setisInEditMode(true);
    }, 500); // Adjust the long press duration as needed
  };

  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => {
      setisInEditMode(true);
    }, 500); // Adjust the long press duration as needed
  };

  const handleTouchEnd = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <>
      <List
        sx={{
          background: "#FFF",
          width: { xs: "100vw", sm: "70vw", md: "unset" },
        }}
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.menuHeader}>
            <Typography variant="h6" className={classes.title}>
              <IconButton
                className="cancel"
                onClick={() => handleCloseDrawer(false)}
                sx={{ display: { sm: "inline-flex", md: "none" } }}
              >
                <KeyboardBackspaceOutlined />
              </IconButton>
              Menu
            </Typography>
            {isInEditMode ? (
              <Box className={classes.actions}>
                <IconButton
                  className="cancel"
                  onClick={() => setisInEditMode(false)}
                  sx={{ display: { xs: "none", md: "inline-flex" } }}
                >
                  <HighlightOff />
                </IconButton>

                <IconButton className="save">
                  <CheckCircleOutlined />
                </IconButton>
              </Box>
            ) : (
              <Box className={classes.actions}>
                <IconButton
                  className="settings"
                  onClick={() => setisInEditMode(true)}
                >
                  <SettingsOutlined />
                </IconButton>
              </Box>
            )}
          </ListSubheader>
        }
      >
        {isInEditMode ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={menu.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {menu.map((item, index) => (
                <SortableRow
                  index={index}
                  key={item.id}
                  item={item}
                  setIsEditModalOpend={setIsEditModalOpend}
                  updateMenuItem={updateMenuItem}
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
        ) : (
          <>
            {menu.map((menuItem, idx) => (
              <>
                {!!menuItem.children ? (
                  <>
                    <ListItem
                      onClick={() => handleClick(idx)}
                      className={classes.parentItemNormal}
                    >
                      <ListItemText primary={menuItem.title} />
                      {isCollapsedOpend === idx ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                    <Collapse
                      in={isCollapsedOpend === idx}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {menuItem.children.map((menuSubItem) => (
                          <ListItem
                            sx={{ pl: 4 }}
                            className={classes.childItemNormal}
                          >
                            {isInEditMode && (
                              <IconButton
                                className="cancel"
                                onClick={() => setisInEditMode(false)}
                              >
                                <DragIndicatorOutlined />
                              </IconButton>
                            )}
                            <ListItemText primary={menuSubItem.title} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem
                    className={classes.parentItemNormal}
                    onMouseDown={handleLongPress}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <ListItemText primary={menuItem.title} />
                  </ListItem>
                )}
              </>
            ))}
          </>
        )}
      </List>

      <Button
        sx={{
          display: { sm: "block", md: "none" },
        }}
        onClick={() => setisInEditMode(false)}
      >
        cancel
      </Button>

      {!!isEditModalOpend && (
        <EditItemModal
          open={isEditModalOpend}
          handleClose={() => setIsEditModalOpend(null)}
          item={isEditModalOpend}
          updateMenuItem={updateMenuItem}
        />
      )}
    </>
  );
};

export default Menu;

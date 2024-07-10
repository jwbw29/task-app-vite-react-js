// src/components/TaskItem.jsx

import clsx from "clsx";
import { useState } from "react";
import { RxPencil2, RxTrash } from "react-icons/rx";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const TaskItem = ({ task, onToggle, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(task.title);

  const handleCheckbox = () => {
    onToggle(task.id, !task.completed);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    onUpdate(task.id, title);
    const closeButton = document.querySelector(`#close-dialog-${task.id}`);
    if (closeButton) {
      closeButton.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div
      className={clsx(
        "flex p-3 my-2 text-xl font-extralight rounded-md hover:bg-primaryButton",
        {
          completedTask: task.completed,
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Checkbox
          id={`checkbox-${task.id}`}
          aria-label={`checkbox ${task.id}`}
          checked={task.completed}
          onClick={handleCheckbox}
          className="size-5"
        />
        <Label
          aria-label={`title ${task.id}`}
          htmlFor={`checkbox-${task.id}`}
          className="hover:cursor-pointer"
        >
          {task.title}
        </Label>
      </div>
      <div className="flex gap-2 ml-auto">
        <AlertDialog>
          <AlertDialogTrigger>
            <RxTrash
              aria-label={`delete button ${task.id}`}
              className="text-2xl place-self-center hover:cursor-pointer"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete <span className="font-bold">{task.title}</span>?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                task from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {!task.completed && (
          <Dialog>
            <DialogTrigger asChild>
              <RxPencil2
                aria-label={`edit button ${task.id}`}
                className="text-2xl place-self-center hover:cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                  Click Save Changes to update.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="taskTitle"
                    value={title}
                    onChange={handleTitleChange}
                    onKeyDown={handleKeyDown}
                    className="col-span-4"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button
                    id={`close-dialog-${task.id}`}
                    type="submit"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default TaskItem;

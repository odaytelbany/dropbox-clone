"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser();
  const [fileId, setFileId, isDeleteModalOpen, setIsDeleteModalOpen] =
    useAppStore((state) => [
      state.fileId,
      state.setFileId,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]);

  async function deleteFile() {
    if (!user || !fileId) return;
    const toastId = toast.loading("Deleting...");
    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
    try {
      await deleteObject(fileRef)
        .then(async () => {
          await deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() =>
            console.log("Deleted!")
          );
        })
        .finally(() => {
          toast.success("Deleted successfully!", {
            id: toastId,
          });
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      toast.error("Deleting faild!", {
        id: toastId
      })
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone, this will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

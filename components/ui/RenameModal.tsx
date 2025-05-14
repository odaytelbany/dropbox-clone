"use client";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "./button";
import { DialogFooter, DialogHeader } from "./dialog";
import { Copy } from "lucide-react";
import { Input } from "./input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

export default function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, fileName] =
    useAppStore((state) => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.filename,
    ]);

    const RenameFile = async () => {
        if (!user || !fileId) return;
        const toastId = toast.loading("Renaming...")
        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            fileName: input,
        })

        toast.success("Renamed successfully!", {
          id: toastId,
        })

        toast.error("Renameing faild!", {
          id: toastId
        })
         
        setInput("");
        setIsRenameModalOpen(false);
    }
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="bp-2">Rename the File</DialogTitle>
          <Input
            id="link"
            defaultValue={fileName}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key == "Enter") {
                RenameFile();
              }
            }}
          />

        </DialogHeader>
          <div className="flex justify-end space-x-2 py-3">
            <Button
              size="sm"
              className="px-3"
              variant={"ghost"}
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>

            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => RenameFile()}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
}

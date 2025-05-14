"use client";
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import Dropzonecomponent from "react-dropzone";
import toast from "react-hot-toast";

const Dropzone = () => {
  const [loading, setLoading] = useState(false);
  const {isLoaded, isSignedIn, user} = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading was faild");
      reader.onload = async () => {
        await uploadPost(file);
      }
      reader.readAsArrayBuffer(file);
    });
  }

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    const toastId = toast.loading("Uploading...")
    setLoading(true);

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      fileName: selectedFile.name,
      type: selectedFile.type,
      size: selectedFile.size,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)
    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadUrl: downloadUrl,

      })
    })
    toast.success("Uploaded successfully!", {
      id: toastId,
    })

    setLoading(false);
  }

  const maxsize = 20971520;
  return (
    <Dropzonecomponent
      minSize={0}
      maxSize={maxsize}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxsize;

        return (
          <section className="m-4">
            <div
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035ffe] text-white animate-pulse"
                  : "bg-slate100/50 dark:bg-slate-800/80 text-slate-400"
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drag a file to upload!"}
              {isDragActive && !isDragReject &&"Drop this to upload!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileLarge && (
                <div className="text-danger mt-2">File is too large!</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzonecomponent>
  );
};

export default Dropzone;

"use client";

import { FileType } from "@/typing";
import {FileIcon, defaultStyles} from "react-file-icon"
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { COLOR_EXTENTION_MAP } from "@/constant";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "type",
    cell: ({ renderValue, ...props }) => {
        const type = renderValue() as string;
        const extention: string = type.split('/')[1];
      return (
        <div className="w-12 h-12">
            <FileIcon 
                extension={extention}
                labelColor={COLOR_EXTENTION_MAP[extention]}
                // @ts-ignore
                {...defaultStyles[extention]}
            />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "Filename",
    cell: ({renderValue, ...props}) => {
      const newName = (renderValue() as string);
      if (newName.length <= 50){
        return <span>{newName}</span>
      }
      else{
        return <span>{newName.substring(0, 50)}...</span>
      }
    }
  },
  {
    accessorKey: "timeStamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="underline text-blue-500 hover:text-blue-600"
        >
          Download
        </a>
      );
    },
  },
];

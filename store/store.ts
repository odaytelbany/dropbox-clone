import {create} from 'zustand';

interface AppState {
    fileId: string | null;
    setFileId: (filename: string) => void;
    
    filename: string;
    setFilename: (filename: string) => void;

    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;
    
    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    fileId: null,
    setFileId: (fileId: string) => set((state) => ({fileId})),

    filename: "",
    setFilename: (filename: string) => set((state) => ({filename})),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set((state) => ({isDeleteModalOpen: open})),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open) => set((state) => ({isRenameModalOpen: open})),
}))
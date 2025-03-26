import { Folder } from '@/types/folder.type';
import { atom } from 'jotai';
const BreadCrumbAtom = atom<Folder[]>([]);

export default BreadCrumbAtom
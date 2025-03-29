import { atom } from 'jotai';
const currentSnippetAtom = atom<string | null>(null);

export default currentSnippetAtom
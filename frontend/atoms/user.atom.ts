import { User } from '@/types/user.type';
import { atom } from 'jotai';
const userAtom = atom<User>();

export default userAtom
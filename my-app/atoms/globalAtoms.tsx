import { atom } from "jotai"

let userAtom = atom<string>("Guest")
let pageStateAtom = atom<string>("home")
let searchTextAtom = atom<string>("")
let chatLogAtom = atom<any[]>([])
let logIndexAtom = atom<number>(0)

export { pageStateAtom, searchTextAtom, chatLogAtom, logIndexAtom, userAtom }

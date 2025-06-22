import { atom } from "recoil";

export const isDarkAtom = atom({
    key: "isDark", // it should be unique.
    default: false,
})
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function firstLetterLowerCase(s: string) {
    return s.replace(/^.{1}/g, s[0].toLowerCase());
}

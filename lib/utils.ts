import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStripeOAuthLink(accountType:"agency"|"subaccount",state:string){
  return "smoething"
}
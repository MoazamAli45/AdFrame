import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  // Remove any non-numeric characters except decimal point
  const numericPrice = price.replace(/[^\d.]/g, "");

  // Parse the price as a number
  const parsedPrice = Number.parseFloat(numericPrice);

  // Format the price with commas for thousands
  return parsedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

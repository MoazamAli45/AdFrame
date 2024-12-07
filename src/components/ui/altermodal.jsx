import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react"; // Import an icon for the close button

const AlertModal = ({ isOpen = true, children, className, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999]">
      <div
        className={cn(
          "bg-white p-6 rounded-[12px] shadow-lg relative max-w-[544px] alert-shadow z-[9999]",
          className
        )}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-full"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default AlertModal;

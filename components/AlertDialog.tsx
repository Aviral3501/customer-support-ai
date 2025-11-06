"use client";
import React from "react";
import { Button } from "./ui/button";

interface AlertDialog {
  /** The message shown inside the dialog */
  message: string;
  /** Label for the confirm button (default: "Confirm") */
  confirmLabel?: string;
  /** Label for the cancel button (default: "Cancel") */
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AlertDialog: React.FC<AlertDialog> = ({
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <p className="text-gray-800 text-center text-sm leading-relaxed">
          {message}
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <Button size="sm" variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button size="sm" variant="destructive" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;

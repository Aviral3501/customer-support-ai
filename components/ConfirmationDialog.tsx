"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ConfirmationDialogProps {
  /** The type of object being deleted (e.g., "chatbot", "project", "user") */
  objectName: string;
  /** The actual name of the specific item (e.g., "Customer Support Bot") */
  name: string;
  /** Function called when deletion is confirmed */
  onConfirm: () => void;
  /** Function called when the dialog is cancelled */
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  objectName,
  name,
  onConfirm,
  onCancel,
}) => {
  const [input, setInput] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Confirm {objectName} Deletion
        </h2>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">
          Are you sure you want to delete the <strong>{objectName}</strong>{" "}
          named <span className="font-semibold text-red-500">&ldquo;{name}&rdquo;</span>?<br />
          <span className="text-sm text-gray-500">
            All associated data will be permanently lost and cannot be recovered.
          </span>
        </p>

        {/* Instruction */}
        <p className="text-gray-600 mb-2">
          To confirm, please type <span className="font-semibold">&ldquo;{name}&rdquo;</span> below:
        </p>

        {/* Input Field */}
        <Input
          placeholder={`Type “${name}” here...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-4"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={input !== name}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

"use client";

import { useState, useMemo } from "react";

interface Characteristic {
  id: number;
  content: string;
  created_at: string;
}

interface Props {
  characteristics: Characteristic[];
}

const CharacteristicsList: React.FC<Props> = ({ characteristics }) => {
  const [showAll, setShowAll] = useState(false);

  // ✅ Sort by created_at (newest first)
  const sortedCharacteristics = useMemo(() => {
    return [...(characteristics || [])].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [characteristics]);

  const displayed = showAll
    ? sortedCharacteristics
    : sortedCharacteristics.slice(0, 3);

  if (!characteristics || characteristics.length === 0) {
    return (
      <p className="text-gray-500 font-light">
        No characteristics added yet!
      </p>
    );
  }

  return (
    <div>
      <ul className="text-xs space-y-1">
        {displayed.map((characteristic) => (
          <li
            key={characteristic.id}
            className="list-disc break-words ml-4"
          >
            {characteristic.content}
          </li>
        ))}
      </ul>

      {characteristics.length > 3 && (
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigating due to parent Link
            setShowAll((prev) => !prev);
          }}
          className="text-blue-500 text-xs mt-2 hover:underline"
        >
          {showAll ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default CharacteristicsList;

"use client";

import { rings } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Image from "next/image";

interface AvatarProps {
  seed: string;
  className?: string;
  size?: number; //  optional size prop (default 50)
}

const Avatar = ({ seed, className = "", size = 50 }: AvatarProps) => {
  // Create the avatar SVG
  const avatar = createAvatar(rings, { seed });
  const svg = avatar.toString();
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return (
    <div
      className={`inline-flex items-center justify-center p-1 border border-gray-200 rounded-full bg-white shadow-sm ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {/* Avatar image */}
      <Image
        src={dataUrl}
        alt={`Avatar of ${seed}`}
        width={size}
        height={size}
        className="rounded-full object-cover w-full h-full"
      />
    </div>
  );
};

export default Avatar;

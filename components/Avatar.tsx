"use client";

import { rings } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Image from "next/image";

const Avatar = ({ seed, className }: { seed: string; className?: string }) => {
  // Create the avatar
  const avatar = createAvatar(rings, {
    seed: seed,
    // You can customize other options if needed
  });

  // Convert the avatar to SVG and encode it as a data URL
  const svg = avatar.toString();
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return (
    <div
      className={`inline-flex items-center justify-center p-1 border border-gray-200 rounded-full bg-white shadow-sm ${className}`}
    >
      {/* Avatar logo */}
      <Image
        src={dataUrl}
        alt="Assistly Logo"
        width={50}
        height={50}
        className={`rounded-full md:w-[70px] md:h-[70px] ${className}`}
      />
    </div>
  );
};

export default Avatar;

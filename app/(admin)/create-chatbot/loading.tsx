import Avatar from "@/components/Avatar";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <Avatar seed="loading sA" className="animate-spin h-16 w-16" />
        <p className="text-gray-500 text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

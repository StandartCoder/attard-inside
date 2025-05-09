import Image from 'next/image';

export function Logo({ size = 72, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full shadow-lg border border-gray-200 dark:border-gray-800 bg-gray-900 dark:bg-transparent ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full p-2">
        <Image
          src="/logo.png"
          alt="Attard & Co Logo"
          fill
          sizes={`${size}px`}
          priority
          className="object-contain p-1"
          onError={(e) => {
            // fallback to placeholder if image fails
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" rx="32" fill="%236366F1"/><text x="50%" y="58%" text-anchor="middle" font-size="22" fill="white" font-family="Arial" font-weight="bold">A&Co</text></svg>';
          }}
        />
      </div>
    </div>
  );
} 
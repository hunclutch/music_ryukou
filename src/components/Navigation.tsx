'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-sm sm:text-xl font-bold text-gray-900 truncate pr-4">
            <span className="hidden sm:inline">BillboardJapan Hot 100をいい感じに見れるサービス</span>
            <span className="sm:hidden">Billboard Hot 100</span>
          </Link>
          
          <div className="flex space-x-2 sm:space-x-8">
            <Link
              href="/"
              className={`px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Charts
            </Link>
            <Link
              href="/favorites"
              className={`px-2 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                isActive('/favorites')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
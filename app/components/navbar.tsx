'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';  

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <nav className="w-full py-5 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl text-white font-bold tracking-wide">
          PWA-SIMPle
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
            <Link href="#how-it-works" className="text-lg text-gray-300 hover:text-white font-comic">
           How it works
             </Link>

          <Link href="#asset" className="text-lg text-gray-300 hover:text-white font-comic">
            PWA-Asset
          </Link>
          <Link href="/knowledge" className="text-lg text-gray-300 hover:text-white font-comic">
            package
          </Link>
        </div>
      </div>
    </nav>
  );
}

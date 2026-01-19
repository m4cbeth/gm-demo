'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="flex justify-between items-center p-0 sticky top-0 z-50 bg-white/40 backdrop-blur-sm">
            <Image
                src="/SWAG-iA-Logo-Vertical.jpg"
                alt="Sensible Wealth Advisory Group"
                width={250}
                height={100}
                className="max-w-[150px] sm:max-w-[200px] md:max-w-[250px] h-auto"
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-4 mr-10 text-xl">
                <Link href="/" className="text-blue-900 hover:text-blue-600">Home</Link>
                <Link href="/about" className="text-blue-900 hover:text-blue-600">About</Link>
                <Link href="/services" className="text-blue-900 hover:text-blue-600">Services</Link>
                <Link href="/contact" className="text-blue-900 hover:text-blue-600">Contact</Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden mr-4 p-2 text-gray-900 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isMenuOpen ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <nav className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm md:hidden border-t border-gray-700">
                    <div className="flex flex-col py-4">
                        <Link
                            href="/"
                            className="text-gray-200 hover:text-blue-300 hover:bg-gray-800 px-6 py-3 text-xl"
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-200 hover:text-blue-300 hover:bg-gray-800 px-6 py-3 text-xl"
                            onClick={closeMenu}
                        >
                            About
                        </Link>
                        <Link
                            href="/services"
                            className="text-gray-200 hover:text-blue-300 hover:bg-gray-800 px-6 py-3 text-xl"
                            onClick={closeMenu}
                        >
                            Services
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-200 hover:text-blue-300 hover:bg-gray-800 px-6 py-3 text-xl"
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}
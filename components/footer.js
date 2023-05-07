import React from 'react';
import { FaTelegram, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="flex flex-col h-full justify-center items-center shadow-inner py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-red-700 font-bold text-xl mb-2">
              Company Name
            </h2>
            <p className="text-red-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h2 className="text-red-700 font-bold text-xl mb-2">Links</h2>
            <nav>
              <ul className="list-none">
                <li>
                  <a href="#" className="text-red-400 hover:text-red-800">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-400 hover:text-red-800">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-400 hover:text-red-800">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-400 hover:text-red-800">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h2 className="text-white font-bold text-xl mb-2">Social Media</h2>
            <div className="flex justify-center gap-5 md:justify-end">
              <a href="/google" className="text-red-400 hover:text-red-800">
                <FaTelegram />
              </a>

              <a href="/j" className="text-red-400 hover:text-red-800">
                <FaTwitter />
              </a>
              <a href="/j" className="text-red-400 hover:text-red-800">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

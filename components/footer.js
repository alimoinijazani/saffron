import React from 'react';
import { FaTelegram, FaInstagram, FaTwitter } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="flex flex-col h-full justify-center items-center shadow-inner py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-between">
          <div class="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h2 class="text-red-700 font-bold text-xl mb-2">Company Name</h2>
            <p class="text-red-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div class="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h2 class="text-red-700 font-bold text-xl mb-2">Links</h2>
            <nav>
              <ul class="list-none">
                <li>
                  <a href="#" class="text-red-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" class="text-red-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" class="text-red-400 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" class="text-red-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="w-full md:w-1/3 text-center md:text-right">
            <h2 class="text-white font-bold text-xl mb-2">Social Media</h2>
            <div class="flex justify-center md:justify-end">
              <a href="#" class="text-red-400 hover:text-white mx-3">
                <FaTelegram />
              </a>
              <a href="#" class="text-red-400 hover:text-white mx-3">
                <FaTwitter />
              </a>
              <a href="#" class="text-red-400 hover:text-white mx-3">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

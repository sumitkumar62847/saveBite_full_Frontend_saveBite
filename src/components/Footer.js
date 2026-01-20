import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-[#283A2C] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">

          <div>
            <h2 className="text-xl font-semibold text-white">SaveBite</h2>
            <p className="mt-2 text-sm text-gray-400">
              SaveBite helps reduce food waste by connecting people with surplus
              food at affordable prices.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Browse Food</li>
              <li className="hover:text-white cursor-pointer">Add Food</li>
              <li className="hover:text-white cursor-pointer">Help & Support</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-white">
              Support
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="hover:text-white cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer">
                Refund Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-white">
              Contact Us
            </h3>
            <p className="text-sm text-gray-400">
               sumitsp877@gmail.com
            </p>
            <p className="text-sm text-gray-400 mt-1">
              📍 India
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gray-600/40"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-between">
          <p className="text-gray-400">
            © 2025 SaveBite. All rights reserved.
          </p>

          <p className="text-gray-500">
            Made by Sumit Kumar for reduce food waste
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;


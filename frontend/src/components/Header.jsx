import React from "react";
import useAuthStore from "../store/authStore";

const Header = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/assets/logocanon.png" className="h-8" alt="canonlogo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="tel:5541251234"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              (555) 412-1234
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/data-konsumen"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Data Konsumen
                </a>
              </li>
              <li>
                <a
                  href="/service-masuk"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Service Masuk
                </a>
              </li>
              <li>
                <a
                  href="/service-keluar"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Service Keluar
                </a>
              </li>
              <li>
                <a
                  href="/claim-garansi"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Service Claim
                </a>
              </li>
              <li>
                <a
                  href="/penawaran"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Penawaran
                </a>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

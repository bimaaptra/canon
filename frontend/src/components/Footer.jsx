import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Our Contact
          </span>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex">
            <div className="">
              <p className="text-gray-900 dark:text-white hover:underline">
                <b>Address:</b> Jl. Alamat Lengkap
              </p>
              <p className="text-gray-900 dark:text-white hover:underline">
                <b>Phone:</b> (0751) 36661
              </p>
              <p className="text-gray-900 dark:text-white hover:underline">
                <b>Fax:</b> (0751) 7535027
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-center py-4 bg-gray-50 dark:bg-gray-700 text-gray-500">
        <p>© {new Date().getFullYear()} Canon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

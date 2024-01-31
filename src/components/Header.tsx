import React from 'react'

const Header = () => {
  return (
    <header>
    

<nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/assets/logocanon.png" className="h-8" alt="canonlogo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" className="text-sm  text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>
        </div>
    </div>
</nav>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                    <a href="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="/datakonsumen" className="text-gray-900 dark:text-white hover:underline">Data Konsumen</a>
                </li>
                <li>
                    <a href="/servicemasuk" className="text-gray-900 dark:text-white hover:underline">Service Masuk</a>
                </li>
                <li>
                    <a href="/servicekeluar" className="text-gray-900 dark:text-white hover:underline">Service Keluar</a>
                </li>
                <li>
                    <a href="/claimgaransi" className="text-gray-900 dark:text-white hover:underline">Service Claim</a>
                </li>
                <li>
                    <a href="/penawaran" className="text-gray-900 dark:text-white hover:underline">Penawaran</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

    </header>
  )
}

export default Header
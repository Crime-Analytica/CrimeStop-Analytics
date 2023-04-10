import React,{useState} from 'react'
import Image from 'next/image';
import Link from 'next/link';

function NavBar() {

  const [percent, setPercent] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const appData = () => ({
    percent: percent,
  });

  const appInit = () => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setPercent(percent);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  
  return (
    <div className="bg-[#1e1e1e]  ">
<div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.8.1/cdn.min.js" defer></script>

<div
        className="flex flex-col items-center justify-center mt-32"
        x-cloak
        x-data={appData}
        x-init={appInit}
      >
        <div className="flex flex-col">
          {/* Page Scroll Progress */}
          <div
            className="fixed inset-x-0 top-0 z-50 h-0.5 mt-0.5 bg-blue-500"
            style={{ width: `${percent}%` }}
          ></div>
</div>



        <nav className="flex justify-around py-4 bg-[#1e1e1e]/90
            backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10">

<div className="flex items-center  ml-20">
<Image src="../../images/icon.svg" className="h-10 object-cover h-14 w-14 z-10" alt={'CRA'} width={14} height={10}/>
  <h3 className="text-2xl font-medium text-[#e01e] ml-4">
    <a className="cursor-pointer">
      <span className='z-10'>CRA</span>
    </a>
  </h3>
</div>

<div className="items-center lg:flex hidden space-x-8 ml-[44rem]">
  <a className="flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300 text-md font-semibold">Get CRA</a>
  <a className="flex text-white cursor-pointer transition-colors duration-300 text-blue-600">Help</a>
  <a className="flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300">Blog</a>
  <Link href="/donate">
  <p className="block px-4 py-2 text-white font-semibold hover:text-blue-500">Donate</p>
</Link>  <a className="flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300">About Us</a>
  <a className="flex text-white hover:text-blue-500 cursor-pointer transition-colors duration-300">Contact</a>
</div>

<div className="lg:hidden flex items-center">
  <button className="text-white hover:text-blue-500 focus:outline-none" onClick={toggleMenu}>
    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
      <path
        className={`${menuVisible ? 'hidden' : 'block'}`}
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={`${menuVisible ? 'block' : 'hidden'}`}
        d="M6 18L18 6M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>

  <div className={`${menuVisible ? 'block' : 'hidden'} absolute top-0 right-0 mt-16 bg-[#1e1e1e] w-48 py-2 rounded-lg shadow-xl z-20`}>
    <a className="block px-4 py-2 text-white font-semibold hover:text-blue-500" href="#">Get CRA</a>
    <a className="block px-4 py-2 text-white font-semibold hover:text-blue-500" href="#">Help</a>
    <a className="block px-4 py-2 text-white font-semibold hover:text-blue-500" href="#">Blog</a>
    <a className="block px-4 py-2 text-white font-semibold hover:text-blue-500" href="#">Donate</a>
    <a className="block px-4 py-2 text-white font-semibold hover:text-blue-500" href="#">About Us</a>
    <a className="block px-4 py-2 text-white font-semibold hover:text-blue-500" href="#">Contact</a>
  </div>
</div>

            <div className="flex items-center hidden lg:flex space-x-3 mr-[5rem]">
                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">

<Image src="../../images/github-mark-white.svg" alt="Your Image" className="h-6 w-6" width={6} height={6}/>


                </a>

                <a className="flex text-gray-600 
                    cursor-pointer transition-colors duration-300
                    font-semibold text-blue-600">
<Image src="../../images/inkedin.svg" alt="Your Image" className="h-6 w-6" width={6} height={6}/>

                </a>
            </div>
        </nav>
    </div>
        </div>
</div>
  )
}

export default NavBar

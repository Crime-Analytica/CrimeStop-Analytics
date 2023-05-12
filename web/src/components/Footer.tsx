import React from 'react'
import Image from 'next/image'
function Footer() {
  return (
    <div>
<footer className="footer p-10 bg-[#0a0a0a] text-base-content">
  <div>
  <Image src="/images/icon.svg" className="w-16" alt={''} width={10} height={10} />
    <p>CrimeStop Analytics Ltd.<br/>A solution to the ongoing problem of crime and public safety</p>
  </div> 
  <div>
    <span className="text-white">Organization</span> 


    <a className="link link-hover">Donate</a> 
    <a className="link link-hover">Careers</a> 
    <a className="link link-hover">Blog</a> 
    <a className="link link-hover">Terms & Privacy Policy</a>
  </div> 
  <div>
    <span className="text-white">Download</span> 
    <a className="link link-hover">Android</a> 
    <a className="link link-hover">iPhone</a> 
    <a className="link link-hover">Windows</a> 
    <a className="link link-hover">Mac</a> 
    <a className="link link-hover">Linux</a>

  </div> 
  <div>

  <span className="text-white">Socials</span> 


<a className="link link-hover">GitHub</a> 
<a className="link link-hover">Linkeldn</a>
</div> 
  <div>
    <span className=" text-white">Help</span> 
    <a className="link link-hover">Support Center</a> 
    <a className="link link-hover">Community</a> 
  </div>
</footer>
    </div>
  )
}

export default Footer

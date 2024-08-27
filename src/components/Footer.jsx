import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-background   w-full">
      <div className="border-b-2 border-gray-200 px-3 py-2 font-semibold ">
        Connect With Us
      </div>
      <div className="p-3 flex flex-col space-y-2">
        <div className="flex space-x-2">
          <img alt="" src="/github-mark-white.svg" className="size-5" />
          <a
            href="https://github.com/tidymouse/carbon-footprint"
            className="text-sm"
          >
            PROJECT
          </a>
        </div>
        <div className="flex space-x-2 text-xs justify-start items-center">
          <div className="flex space-x-2 ">
            <img src="/ln.png" alt="" />
            <a
              href="https://in.linkedin.com/in/advait-yadav-231154271"
              target="_blank"
              rel="noreferrer"
            >
              Advait Yadav
            </a>
          </div>
          <div className="flex space-x-2">
            <img src="/ln.png" alt="" />
            <a
              href="https://in.linkedin.com/in/mrudul-pawar"
              target="_blank"
              rel="noreferrer"
            >
              Mrudul Pawar
            </a>
          </div>
          <div className="flex space-x-2">
            <img src="/ln.png" alt="" />
            <a
              href="https://in.linkedin.com/in/raj-sapale-5605a6250"
              target="_blank"
              rel="noreferrer"
            >
              Raj Sapale
            </a>
          </div>
          <div className="flex space-x-2">
            <img src="/ln.png" alt="" />
            <p>Shreyash Borde</p>
          </div>
          <div className="flex space-x-2">
            <img src="/ln.png" alt="" />
            <a
              href="https://in.linkedin.com/in/vinit-gaikwad-9b3831298"
              target="_blank"
              rel="noreferrer"
            >
              Vinit Gaikwad
            </a>
          </div>
          <div className="flex space-x-2">
            <img src="/ln.png" alt="" />
            <a
              href="https://in.linkedin.com/in/pranjali-narote"
              target="_blank"
              rel="noreferrer"
            >
              Pranjali Narote
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

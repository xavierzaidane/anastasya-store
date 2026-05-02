import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';


const Footer: React.FC = () => {
  return (

      <footer className="bg-primary/10 text-foreground py-16 px-6 mt-24 ">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Brand & Contact Info */}
          <div className="lg:w-1/3">
            <h2 className="text-5xl text-gray-900  font-medium tracking-tight mb-55">Jadi <span className="text-chart-2">Juragan</span> Kami Hari Ini</h2>
            <p className="text-foreground max-w-sm text-lg leading-relaxed mb-50 -mt-10">
              Redefining the dental experience with comfort, clarity, and care. 
              Join the movement toward healthier smiles.
            </p>

            <p className="text-foreground max-w-sm text-lg leading-relaxed ">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 7.5V16.5M15.8971 9.75L8.10289 14.25M15.897 14.25L8.10275 9.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.47867 6.76926C2.20958 10.8137 1.22078 16.4342 4.27013 19.323C6.87609 21.7918 11.5879 21.4667 15.5675 18.7956L20 20.5L18.0841 16.6688C21.8721 12.6801 22.6403 7.43426 19.7299 4.67697C16.6805 1.78811 10.7478 2.72486 6.47867 6.76926Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>

          </div>
          
          {/* Navigation Links */}
          <div className="flex gap-12 md:gap-24 flex-wrap lg:justify-end lg:flex-1 w-full lg:w-auto">
            <div>
              <h4 className="font-medium text-brand-lime mb-6 tracking-wide uppercase text-sm">Clinic</h4>
              <ul className="space-y-3 text-foreground">
                <li>
                  <a href="#" className="inline-block hover:text-brand-lime hover:translate-x-2 transition-all duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-block hover:text-brand-lime hover:translate-x-2 transition-all duration-300">
                    Doctors
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-block hover:text-brand-lime hover:translate-x-2 transition-all duration-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-block hover:text-brand-lime hover:translate-x-2 transition-all duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-brand-lime mb-6 tracking-wide uppercase text-sm">Legal</h4>
              <ul className="space-y-3 text-foreground">
                <li>
                  <a href="#" className="inline-block hover:text-brand-lime hover:translate-x-2 transition-all duration-300">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-block hover:text-brand-lime hover:translate-x-2 transition-all duration-300">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
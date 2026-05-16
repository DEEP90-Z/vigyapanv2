import React from 'react';

const Footer = () => {
  return (
    <footer className="section-padding bg-luxury-black text-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to tell <br /> <span className="italic font-serif font-light opacity-60">your story?</span></h2>
            <button className="px-12 py-4 border border-white/20 rounded-full hover:bg-white hover:text-luxury-black transition-all duration-500 uppercase tracking-widest text-sm">
              Start a Project
            </button>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] mb-6 opacity-40 font-bold">Location</h4>
            <p className="text-lg opacity-80">123 Cinematic Ave,<br />Studio City, CA 91604</p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] mb-6 opacity-40 font-bold">Follow</h4>
            <div className="flex flex-col space-y-4 text-lg opacity-80">
              <a href="#" className="hover:opacity-40 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-40 transition-opacity">Vimeo</a>
              <a href="#" className="hover:opacity-40 transition-opacity">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 text-[10px] uppercase tracking-widest opacity-40">
          <p>© 2026 VIGYAPAN360. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

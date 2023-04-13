

const Navbar: React.FC = () => {


  
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Chatter</span>
          {
           /*
            <img className="h-8 w-auto" src="" alt="" />
           */ 
           }
            </a>
      </div>
      
      <div className="hidden lg:flex lg:gap-x-12">
    
        <a href="#" className="text-sm font-semibold leading-6 text-slate-400">
          Link
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-slate-400">
          Link
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-slate-400">
          Link
        </a>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        { // Signin Logic here if signed in then signout else signin 
         } 
        <a href="#" className="text-sm font-semibold leading-6 text-slate-400">
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

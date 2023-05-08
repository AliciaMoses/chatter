import React from "react";

const FeaturesSection: React.FC = () => {
  return (
    <>
   
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-slate-600">Less is More</h2>
              <p className="mt-2 font-vt323 text-3xl font-bold tracking-tight text-violet-900 sm:text-4xl">Streamlined, Minimalist Design</p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
              Experience an intuitive interface with essential features:
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                User Profiles with Likes & Post History
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Replies & Thread Viewing
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Text Posts & Emoji Support
              </p>
        
            </div>
          </div>
          {/* <img
            src="design\post.png"
            alt="chatter screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-violet-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={1216}
            height={400}
          /> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default FeaturesSection;

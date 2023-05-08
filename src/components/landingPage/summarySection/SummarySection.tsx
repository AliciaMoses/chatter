import React from "react";

const SummarySection: React.FC = () => {
  return (
    <>
      <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-slate-900 sm:text-2xl sm:leading-9">
              <p>
                Chatter offers a simple and efficient platform for developers to
                connect and share ideas. Experience a clean, user-friendly
                environment and join the conversation.
              </p>
            </blockquote>
            <figcaption className="mt-10">
              {/* <img className="mx-auto h-10 w-10 rounded-full" src="" /> */}
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-slate-900">Alicia Moses</div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-slate-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-slate-600">Imaginator of Chatter</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
};

export default SummarySection;

import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center isolate bg-white my-2">
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                404 PAGE NOT FOUND
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                OOPS!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We're sorry, the page you requested could not be found. Please
                go back to the Homepage or contact us at
                admin@nwssu.edu.ph
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/dashboard"
                  className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Back to Home
                </a>
                <a
                  href="/dashboard"
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;

import Image from "next/image";

const LoadingPosts = () => {
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen"
        role="status"
      >
        <div className="space-x-4">
          <div className="inline-block h-12 w-12 animate-bounce motion-reduce:animate-[bounce_1.5s_linear_infinite]">
            <Image src="/images/aliens/1.png" alt="Loading..." width={64} height={64} />
          </div>
          <div className="inline-block h-12 w-12 animate-bounce motion-reduce:animate-[bounce_1.5s_linear_infinite]">
            <Image src="/images/aliens/2.png" alt="Loading..." width={64} height={64} />
          </div>
          <div className="inline-block h-12 w-12 animate-bounce motion-reduce:animate-[bounce_1.5s_linear_infinite]">
            <Image src="/images/aliens/3.png" alt="Loading..." width={64} height={64} />
          </div>
          <div className="inline-block h-12 w-12 animate-bounce motion-reduce:animate-[bounce_1.5s_linear_infinite]">
            <Image src="/images/aliens/4.png" alt="Loading..." width={64} height={64} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingPosts;

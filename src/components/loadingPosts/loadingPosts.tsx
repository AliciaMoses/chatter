import Image from "next/image";

const LoadingPosts = () => {
  return (
    <div role="status">
      <Image
        src="/images/aliens/1.png"
        alt="Loading..."
        width={64}
        height={64}
        className="text-primary inline-block animate-[spinner-grow_0.75s_linear_infinite] rounded-full align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      />
      <Image
        src="/images/aliens/2.png"
        alt="Loading..."
        width={64}
        height={64}
        className="text-secondary inline-block animate-[spinner-grow_0.75s_linear_infinite] rounded-full align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      />
      <Image
        src="/images/aliens/3.png"
        alt="Loading..."
        width={64}
        height={64}
        className="text-success inline-block animate-[spinner-grow_0.75s_linear_infinite] rounded-full align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      />
      <Image
        src="/images/aliens/4.png"
        alt="Loading..."
        width={64}
        height={64}
        className="text-danger inline-block animate-[spinner-grow_0.75s_linear_infinite] rounded-full align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      />

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingPosts;

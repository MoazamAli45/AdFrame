/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

const Phone = ({ imgSrc, className, dark = false, video = true, ...props }) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? "/assets/phone-template-dark-edges.png"
            : "/assets/phone-template-white-edges.png"
        }
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />

      <div className="absolute -z-10 inset-0">
        {video ? (
          // <video
          //   className="object-cover min-w-full min-h-full "
          //   src={imgSrc}
          //   autoPlay
          //   loop
          //   muted
          //   playsInline
          // />
          <iframe
            src="https://assets.pinterest.com/ext/embed.html?id=881720433305656245"
            height="295"
            width="345"
            frameborder="0"
            scrolling="no"
          ></iframe>
        ) : (
          <img
            className="object-cover min-w-full min-h-full"
            src={imgSrc}
            alt="overlaying phone image"
          />
        )}
      </div>
    </div>
  );
};

export default Phone;

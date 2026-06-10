"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate();
  const hasAnimated = useRef(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    // After the first animation, skip re-animating on language change
    if (hasAnimated.current) return;

    const timeout = setTimeout(() => {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.03),
        }
      );
      hasAnimated.current = true;
    }, 50);

    return () => clearTimeout(timeout);
  }, [words]);

  const showImmediately = hasAnimated.current;

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "dark:text-white text-black",
                showImmediately ? "opacity-100" : "opacity-0"
              )}
              style={{
                filter: showImmediately
                  ? "none"
                  : filter
                    ? "blur(10px)"
                    : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-normal", className)}>
      <div className="mt-4">
        <div className=" dark:text-zinc-400 text-black leading-relaxed text-[15px] md:text-base">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

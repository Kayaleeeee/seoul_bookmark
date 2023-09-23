import { useLayoutEffect } from "react";

export const useInfiniteScroll = ({
  triggerElementId,
  containerElementId,
  onScroll,
}: {
  triggerElementId: string;
  containerElementId: string;
  onScroll: Function;
}) => {
  useLayoutEffect(() => {
    const triggerElement = document.querySelector(triggerElementId);

    const containerElement = document.getElementById(containerElementId);

    const currentHeight =
      containerElement?.getBoundingClientRect().height || window.innerHeight;

    const handleScroll = () => {
      const triggerElementPosition =
        triggerElement?.getBoundingClientRect().y || window.innerHeight;

      if (triggerElementPosition <= currentHeight) {
        onScroll();
      }
    };

    (containerElement || window).addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      (containerElement || window).removeEventListener("scroll", handleScroll);
  });
};

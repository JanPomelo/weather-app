export default function dropDown(
  nav: HTMLElement,
  context: HTMLElement,
  endWidth: string,
  duration: number,
  animation: string
): void {
  nav.addEventListener("click", function extend(): void {
    context.animate(
      [
        {
          height: "0px",
        },
        {
          height: endWidth,
        },
      ],
      {
        iterations: 1,
        duration: duration,
        easing: animation,
        fill: "forwards",
      }
    );
    nav.removeEventListener("click", extend);
    nav.addEventListener("click", function disappear(): void {
      context.animate(
        [
          {
            height: endWidth,
          },
          {
            height: "0px",
          },
        ],
        {
          iterations: 1,
          duration: duration,
          easing: animation,
          fill: "forwards",
        }
      );
      nav.removeEventListener("click", disappear);
      nav.addEventListener("click", extend);
    });
  });
  /*nav.addEventListener("mouseout", (): void => {
    context.classList.add("invisible");
  });
  context.addEventListener("mouseover", (): void => {
    context.classList.remove("invisible");
  });
  context.addEventListener("mouseout", (): void => {
    context.classList.add("invisible");
  }); */
}

export function GradientButton() {
  return (
    <button
      className="group flex w-full items-center rounded-lg bg-[linear-gradient(144deg,#FF20F2,#2242F3_50%,#2ae120)] p-[3px] text-sm font-medium tracking-normal text-black transition-transform duration-200 hover:text-white hover:outline-none focus:outline-none focus:ring-gray-500 focus:ring-offset-1 focus:ring-offset-white focus-visible:ring-2 active:scale-90 active:outline-none dark:text-white dark:focus:ring-gray-500 dark:focus:ring-offset-black"
      type="button"
    >
      <span className="h-full w-full rounded-md bg-slate-100 px-4 py-2 duration-300 group-hover:bg-transparent dark:bg-slate-950">
        Gradient
      </span>
    </button>
  );
}

export const AmbientBackdrop = () => {
  return (
    <>
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] z-0 h-[50vw] w-[50vw] rounded-full bg-emerald-500/2 blur-[120px]" />
      <div className="pointer-events-none fixed right-[-10%] bottom-[-10%] z-0 h-[60vw] w-[60vw] rounded-full bg-indigo-500/2 blur-[150px]" />
    </>
  );
};

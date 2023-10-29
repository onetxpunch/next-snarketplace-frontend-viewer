const Nav = () => {
  return (
    <div className="sticky top-0 flex flex-col justify-center w-full h-16 p-4 mb-8 text-2xl font-black shadow-xl bg-emerald-200">
      <div className="flex items-center gap-2">
        <div>🔎</div>
        <div>
          <div>Snarkyscan</div>
          <div className="-mt-2 text-2xl">explorer</div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

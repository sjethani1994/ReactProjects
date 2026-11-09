const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-6">
        <h1 className="text-xl font-bold tracking-wide">
          Employee<span className="text-blue-400">Hub</span>
        </h1>

        <nav className="flex items-center gap-6">
          <span className="cursor-pointer text-sm font-medium hover:text-blue-400">
            Dashboard
          </span>
          <span className="cursor-pointer text-sm font-medium hover:text-blue-400">
            Employees
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-semibold">
            A
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

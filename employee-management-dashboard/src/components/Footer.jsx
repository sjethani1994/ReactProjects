const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          © 2026 EmployeeHub. All rights reserved.
        </p>

        <p className="text-sm text-slate-400">
          Built with <span className="text-cyan-400 font-semibold">React</span>{" "}
          &<span className="text-cyan-400 font-semibold"> Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

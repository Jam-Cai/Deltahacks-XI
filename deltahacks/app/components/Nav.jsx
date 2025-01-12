const Nav = () => (
  <nav className="fixed right-4 top-4 w-1/10 rounded-2xl flex flex-col gap-2 font-bold text-xl items-center shadow-2xl text-black bg-white py-4 px-12 justify-between z-50">
    {/* Logo */}
    <a href="/">
        <div className="flex flex-row text-xl font-bold">
          <h1 className="text-3xl">
            Fair<span className="text-[#FBAE3C]">Fi</span>
          </h1>
          <img src="logoo.svg" className="w-8 mt-[-8]" alt="Logo" />
      </div>
    </a>

    {/* Navigation Links */}
    <ul className="flex space-x-6">
      <li>
        <a
          href="/"
          className="hover:text-[#FBAE3C] transition-colors duration-300"
          aria-label="Home"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="dashboard"
          className="hover:text-[#FBAE3C] transition-colors duration-300"
          aria-label="Contact"
        >
          Dashboard
        </a>
      </li>
    </ul>
  </nav>
);

export default Nav;

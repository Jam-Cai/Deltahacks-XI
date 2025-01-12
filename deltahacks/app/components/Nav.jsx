const Nav = () => (
  <nav className="shadow-2xl py-4 text-white w-12 bg-black flex justify-between items-center px-8">
    <div className="text-xl font-bold">Logo</div>
    <ul className="flex space-x-6">
      <li>
        <a href="#" className="hover:text-gray-300">
          Home
        </a>
      </li>
      <li>
        <a href="#" className="hover:text-gray-300">
          About
        </a>
      </li>
      <li>
        <a href="#" className="hover:text-gray-300">
          Services
        </a>
      </li>
      <li>
        <a href="#" className="hover:text-gray-300">
          Contact
        </a>
      </li>
    </ul>
  </nav>
);

export default Nav;

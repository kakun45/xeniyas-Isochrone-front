import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <a
        className="inline-flex btn color-blue color-white-on-active bg-transparent bg-darken10-on-hover bg-blue-on-active txt-s ml3 is-active"
        href="/">
        <svg className="icon txt-m mr6">
          <use xlinkHref="#icon-home" />
        </svg>{" "}
        Home
      </a>
      <a
        className="inline-flex btn color-blue color-white-on-active bg-transparent bg-darken10-on-hover bg-blue-on-active txt-s ml3"
        href="#">
        <svg className="icon txt-m mr6">
          <use xlinkHref="#icon-user" />
        </svg>{" "}
        <Link
          to="https://www.linkedin.com/in/xeniya-shoiko/"
          target="_blank"
          rel="noopener noreferrer">
          Author's LinkedIn
        </Link>
      </a>
      {/* <a
        className="inline-flex btn color-blue color-white-on-active bg-transparent bg-darken10-on-hover bg-blue-on-active txt-s ml3"
        href="#">
        <svg className="icon txt-m mr6">
          <use xlinkHref="#icon-logout" />
        </svg>{" "}
        Logout
      </a> */}
    </nav>
  );
}

export default Navbar;

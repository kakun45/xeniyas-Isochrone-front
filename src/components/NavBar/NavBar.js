import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link
        className="inline-flex btn color-blue color-white-on-active bg-transparent bg-darken10-on-hover bg-blue-on-active txt-s ml3 is-active"
        to="/">
        <svg className="icon txt-m mr6">
          <use xlinkHref="#icon-home" />
        </svg>{" "}
        NYC Midtown
      </Link>
      <div className="inline-flex btn color-blue color-white-on-active bg-transparent bg-darken10-on-hover bg-blue-on-active txt-s ml3">
        <svg className="icon txt-m mr6">
          <use xlinkHref="#icon-user" />
        </svg>{" "}
        <a
          href="https://www.linkedin.com/in/xeniya-shoiko/"
          target="_blank"
          rel="noopener noreferrer">
          Report an Issue or Say Hi on LinkedIn
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

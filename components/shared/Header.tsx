"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { AuthButton } from "../../app/components/AuthButton";
import MouseCursor from "./MouseCursor";

const menu = [
  {
    id: "1",
    title: "Communities",
    url: "/",
  },
  {
    id: "2",
    title: "Projects",
    url: "/projects",
  },
  {
    id: "3",
    title: "Economics",
    url: "/economics",
  },
  {
    id: "4",
    title: "Create Club",
    url: "/create-club",
  },
  {
    id: "5",
    title: "Whitepaper",
    url: "/whitepaper",
  },
];

const Header = () => {
  const [search, setSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathName = usePathname();
  
  useEffect(() => {
    if (search) {
      document.body.classList.add("search-active");
    } else {
      document.body.classList.remove("search-active");
    }
  }, [search]);

  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <nav className="navbar p-0">
                <div className="navbar__logo d-xxl-none">
                  <Link href="/" aria-label="home page" title="logo" className="not-cursor">
                    <div className="d-flex align-items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                      <span className="text-2xl font-bold text-white">builda.club</span>
                    </div>
                  </Link>
                </div>
                <div className="navbar__menu d-none d-xl-block">
                  <ul className="navbar__list">
                    {menu.map(({ id, title, url }) => (
                      <li key={id} className={`navbar__item nav-fade ${pathName === url ? "active" : ""}`}>
                        <Link href={url}>{title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="navbar__items-wrapper">
                  <div className="navbar__items">
                    <div className="search-popup">
                      <button onClick={() => setSearch(false)} className="close-search" aria-label="close search box" title="close search box">
                        <i className="ti ti-x"></i>
                      </button>
                      <form action="#" method="post" autoComplete="off">
                        <div className="navbar__items-search search-popup__group">
                          <input type="search" name="search-field" id="searchField" placeholder="Find the next 100x community..." required />
                          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" className="cmn-shape">
                            <path d="M0 0  L100 0  L100 75 L92 100 L0 100 Z" vectorEffect="non-scaling-stroke" />
                          </svg>
                          <button type="submit" aria-label="search communities" title="search communities">
                            <i className="ti ti-search"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                    <button onClick={() => setSearch(true)} aria-label="open search popup" title="open search popup" className="open-search">
                      <i className="ti ti-search"></i>
                    </button>
                    <AuthButton />
                    <button onClick={() => setMobileMenu(true)} className={`open-offcanvas-nav d-flex d-xl-none open-mobile-menu ${mobileMenu && "open-offcanvas-nav-active"}`} aria-label="toggle mobile menu" title="open offcanvas menu">
                      <span className="icon-bar top-bar"></span>
                      <span className="icon-bar middle-bar"></span>
                      <span className="icon-bar bottom-bar"></span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu d-block d-xl-none ${mobileMenu && "show-menu"}`}>
          <nav className={`mobile-menu__wrapper`}>
            <div className="mobile-menu__header nav-fade">
              <div className="logo">
                <Link href="/" aria-label="home page" title="logo">
                  <div className="d-flex align-items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    <span className="text-2xl font-bold text-white">builda.club</span>
                  </div>
                </Link>
              </div>
              <button onClick={() => setMobileMenu(false)} aria-label="close mobile menu" className="close-mobile-menu">
                <i className="ti ti-x"></i>
              </button>
            </div>
            <div className="mobile-menu__list">
              <ul className="navbar__list">
                {menu.map(({ id, url, title }) => (
                  <li key={id} className={`navbar__item nav-fade ${pathName === url ? "active" : ""}`}>
                    <Link href={url}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mobile-menu__options nav-fade">
              <AuthButton />
            </div>
          </nav>
        </div>

        <div onClick={() => setMobileMenu(false)} className={`mobile-menu__backdrop ${mobileMenu && "mobile-menu__backdrop-active"}`}></div>
      </header>

      <MouseCursor />
    </>
  );
};

export default Header;

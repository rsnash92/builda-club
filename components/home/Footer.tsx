"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Social from "../shared/Social";

gsap.registerPlugin(ScrollTrigger);
const Footer = () => {
  const path = usePathname();
  useEffect(() => {
    const fadeItems = document.querySelectorAll<HTMLElement>(".fade-top");

    fadeItems.forEach((element, index) => {
      const delay = index * 0.2;

      gsap.set(element, {
        opacity: 0,
        y: 160,
      });

      ScrollTrigger.create({
        trigger: element,
        start: "top 100%",
        end: "bottom 20%",
        scrub: 0.5,
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: delay,
          });
        },
        once: true,
      });
    });
  }, [path]);
  return (
    <footer className="footer fade-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="footer__inner pt-120 pb-120">
              <div className="row vertical-column-gap-lg">
                <div className="col-12 col-lg-4">
                  <div className="footer__widget fade-top">
                    <div className="footer__widget-header">
                      <h4 className="fw-6 title-animation mt-8">Quick Link</h4>
                    </div>
                    <div className="footer__widget-content mt-30">
                      <div className="row">
                        <div className="col-12 col-xl-6">
                          <ul>
                            <li>
                              <Link href="/">Communities</Link>
                            </li>
                            <li>
                              <Link href="/create-club">Create Club</Link>
                            </li>
                            <li>
                              <Link href="/economics">Economics</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col-12 col-xl-6">
                          <ul>
                            <li>
                              <Link href="/whitepaper">Whitepaper</Link>
                            </li>
                            <li>
                              <Link href="/projects">Projects</Link>
                            </li>
                            <li>
                              <Link href="/economics">Governance</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="footer__widget-newsletter mt-60">
                      <div className="footer__newsletter-header">
                        <h5 className="fw-6 mt-8">Subscribe To Newsletter</h5>
                      </div>
                      <div className="footer__newsletter-wrapper mt-24">
                        <form action="#" method="post" autoComplete="off">
                          <div className="newsletter-form">
                            <div className="newsletter-form-group">
                              <input type="email" name="subscribe-newsletter" id="subscribeNewsletter" placeholder="Enter Your Email" required />
                              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" className="cmn-shape">
                                <path d="M0 0  L100 0  L100 75 L92 100 L0 100 Z" vectorEffect="non-scaling-stroke" />
                              </svg>
                            </div>
                            <button type="submit" aria-label="Subscribe Our Newsletter" title="Subscribe Our Newsletter" className="btn--primary">
                              <i className="ti ti-send"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="footer__widget footer__widget--alt mt-8 fade-top">
                    <div className="footer__widget-text">
                      <p className="text-center">Transform online communities into builder DAOs where members become co-owners, not subscribers.</p>
                    </div>
                    <div className="footer__widget-logo text-center mt-35">
                      <Link href="/" aria-label="home page" title="logo" className="not-cursor">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                          <span className="text-3xl font-bold text-white">builda.club</span>
                        </div>
                      </Link>
                    </div>
                    <div className="footer__widget-text footer__widget-text--alt mt-35">
                      <p className="text-center">BUIDL Your Community's Future!</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="footer__widget footer__widget-contact fade-top">
                    <div className="footer__widget-header">
                      <h4 className="fw-6 title-animation mt-8">Contact Us</h4>
                    </div>
                    <div className="footer__widget-content mt-24">
                      <div className="row">
                        <div className="col-12 col-xl-6">
                          <div>
                            <p>
                              <a href="https://builda.club" target="_blank">
                                builda.club - Web3 Community Platform
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="col-12 col-xl-6">
                          <ul>
                            <li>
                              <a href="https://twitter.com/buildaclub" target="_blank">@buildaclub</a>
                            </li>
                            <li>
                              <a href="mailto:hello@builda.club">hello@builda.club</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="footer__widget-social mt-60">
                      <div className="footer__social-header">
                        <h5 className="fw-6 mt-8">Follow Us :</h5>
                      </div>
                      <div className="footer__social-wrapper mt-24">
                        <Social />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-thumb fade-left">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-4xl">🏗️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer__copyright">
              <div className="row align-items-center vertical-column-gap">
                <div className="col-12 col-lg-6">
                  <div className="footer__copyright-content text-center text-lg-start">
                    <p>
                      Copyright &copy;
                      <span id="copyrightYear"></span>
                      <Link href="/">builda.club</Link>. <span className="divider"></span> BUIDL Your Community's Future
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="footer__copyright-links">
                    <ul className="justify-content-center justify-content-lg-end">
                      <li>
                        <Link href="/contact-us">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">Terms & Conditions</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

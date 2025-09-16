"use client";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Define the type for the club object
interface Club {
  id: number;
  name: string;
  category: string;
  color: string;
}
const clubs: Club[] = [
  { id: 1, name: "AI", category: "ai", color: "from-blue-500 to-purple-600" },
  { id: 2, name: "Gaming", category: "gaming", color: "from-green-500 to-blue-600" },
  { id: 3, name: "DeFi", category: "money", color: "from-yellow-500 to-orange-600" },
  { id: 4, name: "Social", category: "social", color: "from-pink-500 to-red-600" },
  { id: 5, name: "Utility", category: "utility", color: "from-indigo-500 to-purple-600" },
  { id: 6, name: "Fun", category: "fun", color: "from-cyan-500 to-blue-600" },
  { id: 7, name: "AI", category: "ai", color: "from-emerald-500 to-green-600" },
  { id: 8, name: "Gaming", category: "gaming", color: "from-violet-500 to-purple-600" },
  { id: 9, name: "DeFi", category: "money", color: "from-rose-500 to-pink-600" },
];
const Sidebar = () => {
  return (
    <aside className="nftg-sidebar">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sidebar__wrapper">
              <div className="sidebar__widget">
                <Link href="/" className="sidebar__logo not-cursor" aria-label="home page" title="logo">
                  <div className="d-flex align-items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    <span className="text-lg font-bold text-white">builda</span>
                  </div>
                </Link>
              </div>
              <div className="sidebar__widget sidebar--links">
                <ul>
                  <li>
                    <Link href="/" aria-label="browse communities" title="browse communities">
                      <i className="ti ti-layout-grid-add"></i>
                      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/economics" aria-label="view economics" title="view economics">
                      <i className="ti ti-chart-bar"></i>
                      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/create-club" aria-label="create club" title="create club">
                      <i className="ti ti-plus"></i>
                      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/whitepaper" aria-label="read whitepaper" title="read whitepaper">
                      <i className="ti ti-file-text"></i>
                      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="sidebar__widget sidebar--images">
                <div className="sidebar__widget-slider">
                  <Swiper
                    loop={true}
                    speed={1000}
                    slidesPerView={3}
                    spaceBetween={20}
                    centeredSlides={true}
                    direction="vertical"
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    className="sidebar-game-slider swiper"
                  >
                    {clubs.map((club) => (
                      <SwiperSlide key={club.id} className="swiper-slide">
                        <div className="sidebar-slider__single">
                          <Link href={`/?category=${club.category}`} aria-label="browse clubs" title="view club details">
                            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${club.color} flex items-center justify-center`}>
                              <span className="text-white font-bold text-sm">{club.name}</span>
                            </div>
                            <svg viewBox="-3 -3 106 106" xmlns="http://www.w3.org/2000/svg" fill="none" className="hexagon-border">
                              <polygon points="50 0, 100 25, 100 75, 50 100, 0 75, 0 25" />
                            </svg>
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="sidebar__widget sidebar--links">
                <ul>
                  <li>
                    <Link href="/create-club" aria-label="create club" title="create club">
                      <i className="ti ti-circle-plus"></i>
                      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/economics" aria-label="view settings" title="view economics">
                      <i className="ti ti-settings"></i>
                      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/whitepaper" aria-label="read docs" title="read docs">
                      <i className="ti ti-book"></i>
                      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

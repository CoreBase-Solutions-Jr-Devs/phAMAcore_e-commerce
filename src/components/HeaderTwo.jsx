import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesHierarchyQueryFn } from "@/lib/api";

const LANGUAGES = [
  { label: "English", flag: "flag1.png" },
  { label: "Japan", flag: "flag2.png" },
  { label: "French", flag: "flag3.png" },
  { label: "Germany", flag: "flag4.png" },
  { label: "Bangladesh", flag: "flag6.png" },
  { label: "South Korea", flag: "flag5.png" },
];

const CURRENCIES = [
  { label: "USD", flag: "flag1.png" },
  { label: "Yen", flag: "flag2.png" },
  { label: "Franc", flag: "flag3.png" },
  { label: "EURO", flag: "flag4.png" },
  { label: "BDT", flag: "flag6.png" },
  { label: "WON", flag: "flag5.png" },
];

const SHOP_NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/product-details-two", label: "Item Details" },
];

const PAGES_NAV = [
  { to: "/cart", label: "Cart" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/checkout", label: "Checkout" },
  { to: "/become-seller", label: "Become Seller" },
  { to: "/account", label: "Account" },
];

const VENDORS_NAV = [
  { to: "/vendor", label: "Vendor" },
  { to: "/vendor-details", label: "Vendor Details" },
  { to: "/vendor-two", label: "Vendor Two" },
  { to: "/vendor-two-details", label: "Vendor Two Details" },
];

const BLOG_NAV = [
  { to: "/blog", label: "Blog" },
  { to: "/blog-details", label: "Blog Details" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

/** Reusable dropdown list for language / currency selectors */
const SelectorDropdown = ({ selected, options, onChange }) => (
  <li className="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
    <Link to="#" className="selected-text text-heading text-sm py-8">
      {selected}
    </Link>
    <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
      {options.map(({ label, flag }) => (
        <li key={label}>
          <Link
            to="#"
            className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
            onClick={() => onChange(label)}
          >
            <img
              src={`assets/images/thumbs/${flag}`}
              alt={label}
              className="w-16 h-12 rounded-4 border border-gray-100"
            />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

/** Language + currency selectors row */
const LocaleSelectors = ({ language, currency, onLanguage, onCurrency }) => (
  <ul className="header-top__right style-two flex-align flex-wrap">
    <SelectorDropdown selected={language} options={LANGUAGES} onChange={onLanguage} />
    <SelectorDropdown selected={currency} options={CURRENCIES} onChange={onCurrency} />
  </ul>
);

/** Desktop nav item with a dropdown submenu */
const DropdownNavItem = ({ label, badge, items, badgeColor }) => (
  <li className="on-hover-item nav-menu__item has-submenu">
    {badge && (
      <span className={`badge-notification ${badgeColor} text-white text-sm py-2 px-8 rounded-4`}>
        {badge}
      </span>
    )}
    <Link to="#" className="nav-menu__link">{label}</Link>
    <ul className="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
      {items.map(({ to, label: itemLabel }) => (
        <li key={to} className="common-dropdown__item nav-submenu__item">
          <NavLink
            to={to}
            className={({ isActive }) =>
              `common-dropdown__link nav-submenu__link hover-bg-neutral-100${isActive ? " activePage" : ""}`
            }
          >
            {itemLabel}
          </NavLink>
        </li>
      ))}
    </ul>
  </li>
);

// ── Main component ────────────────────────────────────────────────────────────
const HeaderTwo = ({ category }) => {
  const [scroll, setScroll] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState(false);
  const [activeIndexCat, setActiveIndexCat] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScroll(window.pageYOffset > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (i) => setActiveIndex(activeIndex === i ? null : i);
  const handleMenuToggle = () => setMenuActive(v => !v);
  const handleCatClick = (i) => setActiveIndexCat(activeIndexCat === i ? null : i);
  const handleCategoryToggle = () => setActiveCategory(v => !v);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesHierarchyQueryFn,
  });

  return (
    <>
      <div className="overlay" />
      <div className={`side-overlay ${(menuActive || activeCategory) && "show"}`} />

      {/* ── Search box ── */}
      <form action="#" className={`search-box ${activeSearch && "active"}`}>
        <button
          onClick={() => setActiveSearch(v => !v)}
          type="button"
          className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
        >
          <i className="ph ph-x" />
        </button>
        <div className="container">
          <div className="position-relative">
            <input
              type="text"
              className="form-control py-16 px-24 text-xl rounded-pill pe-64"
              placeholder="Search for a product or brand"
            />
            <button
              type="submit"
              className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
            >
              <i className="ph ph-magnifying-glass" />
            </button>
          </div>
        </div>
      </form>

      {/* ── Mobile menu ── */}
      <div className={`mobile-menu scroll-sm d-lg-none d-block ${menuActive && "active"}`}>
        <button
          onClick={() => { handleMenuToggle(); setActiveIndex(null); }}
          type="button"
          className="close-button"
        >
          <i className="ph ph-x" />
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img src="assets/images/logo/logo.png" alt="Logo" />
          </Link>
          <div className="mobile-menu__menu">
            <ul className="nav-menu flex-align nav-menu--mobile">

              {/* Home — no dropdown, direct link */}
              <li className="nav-menu__item">
                <Link to="/" className="nav-menu__link" onClick={() => setActiveIndex(null)}>
                  Home
                </Link>
              </li>

              {/* Shop */}
              <li
                onClick={() => handleMenuClick(1)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 1 ? "d-block" : ""}`}
              >
                <Link to="#" className="nav-menu__link">Shop</Link>
                <ul className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 1 ? "open" : ""}`}>
                  {SHOP_NAV.map(({ to, label }) => (
                    <li key={to} className="common-dropdown__item nav-submenu__item">
                      <Link onClick={() => setActiveIndex(null)} to={to} className="common-dropdown__link nav-submenu__link hover-bg-neutral-100">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Pages */}
              <li
                onClick={() => handleMenuClick(2)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 2 ? "d-block" : ""}`}
              >
                <span className="badge-notification bg-warning-600 text-white text-sm py-2 px-8 rounded-4">New</span>
                <Link to="#" className="nav-menu__link">Pages</Link>
                <ul className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 2 ? "open" : ""}`}>
                  {PAGES_NAV.map(({ to, label }) => (
                    <li key={to} className="common-dropdown__item nav-submenu__item">
                      <Link onClick={() => setActiveIndex(null)} to={to} className="common-dropdown__link nav-submenu__link hover-bg-neutral-100">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Vendors */}
              <li
                onClick={() => handleMenuClick(3)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 3 ? "d-block" : ""}`}
              >
                <span className="badge-notification bg-tertiary-600 text-white text-sm py-2 px-8 rounded-4">New</span>
                <Link to="#" className="nav-menu__link">Vendors</Link>
                <ul className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 3 ? "open" : ""}`}>
                  {VENDORS_NAV.map(({ to, label }) => (
                    <li key={to} className="common-dropdown__item nav-submenu__item">
                      <Link onClick={() => setActiveIndex(null)} to={to} className="common-dropdown__link nav-submenu__link hover-bg-neutral-100">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Blog */}
              <li
                onClick={() => handleMenuClick(4)}
                className={`on-hover-item nav-menu__item has-submenu ${activeIndex === 4 ? "d-block" : ""}`}
              >
                <Link to="#" className="nav-menu__link">Blog</Link>
                <ul className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === 4 ? "open" : ""}`}>
                  {BLOG_NAV.map(({ to, label }) => (
                    <li key={to} className="common-dropdown__item nav-submenu__item">
                      <Link onClick={() => setActiveIndex(null)} to={to} className="common-dropdown__link nav-submenu__link hover-bg-neutral-100">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-menu__item">
                <Link to="/contact" className="nav-menu__link">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Middle header ── */}
      <header className="header-middle style-two bg-color-neutral">
        <div className="container container-lg">
          <nav className="header-inner flex-between">
            <div className="logo">
              <Link to="/" className="link">
                <img src="assets/images/logo/logo-two.png" alt="Logo" />
              </Link>
            </div>

            <div className="flex-align gap-16">
              {/* Mobile locale selectors */}
              <div className="select-dropdown-for-home-two d-lg-none d-block">
                <LocaleSelectors
                  language={selectedLanguage} onLanguage={setSelectedLanguage}
                  currency={selectedCurrency} onCurrency={setSelectedCurrency}
                />
              </div>

              <form action="#" className="flex-align flex-wrap form-location-wrapper">
                <div className="search-category style-two d-flex h-48 search-form d-sm-flex d-none">
                  <select defaultValue={1} className="js-example-basic-single border border-gray-200 border-end-0 rounded-0 border-0" name="state">
                    {["All Categories", "Grocery", "Breakfast & Dairy", "Vegetables", "Milks and Dairies", "Pet Foods & Toy", "Breads & Bakery", "Fresh Seafood", "Frozen Foods", "Noodles & Rice", "Ice Cream"].map(opt => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="search-form__wrapper position-relative">
                    <input
                      type="text"
                      className="search-form__input common-input py-13 ps-16 pe-18 rounded-0 border-0"
                      placeholder="Search for a product or brand"
                    />
                  </div>
                  <button type="submit" className="bg-main-two-600 flex-center text-xl text-white flex-shrink-0 w-48 hover-bg-main-two-700 d-lg-flex d-none">
                    <i className="ph ph-magnifying-glass" />
                  </button>
                </div>
              </form>
            </div>

            {/* Desktop middle-header icons */}
            <div className="header-right flex-align d-lg-block d-none">
              <div className="header-two-activities flex-align flex-wrap gap-32">
                {[
                  { to: "/account", icon: "ph ph-user", badge: null, label: "Profile" },
                  { to: "/wishlist", icon: "ph ph-heart", badge: "2", label: "Wishlist" },
                  // { to: "/cart", icon: "ph-fill ph-shuffle", badge: "2", label: "Compare" },
                  { to: "/cart", icon: "ph ph-shopping-cart-simple", badge: "2", label: "Cart" },
                ].map(({ to, icon, badge, label }) => (
                  <Link key={label} to={to} className="flex-align flex-column gap-8 item-hover-two">
                    <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className={icon} />
                      {badge && (
                        <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                          {badge}
                        </span>
                      )}
                    </span>
                    <span className="text-md text-white item-hover__text d-none d-lg-flex">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Main sticky header ── */}
      <header className={`header bg-white border-bottom border-gray-100 ${scroll && "fixed-header"}`}>
        <div className="container container-lg">
          <nav className="header-inner d-flex justify-content-between gap-8">
            <div className="flex-align menu-category-wrapper">

              {/* Category dropdown (style toggles based on `category` prop) */}
              <div className={`category-two ${category === false ? "d-block" : "d-none"}`}>
                <button
                  onClick={handleCategoryToggle}
                  type="button"
                  className="category__button flex-align gap-8 fw-medium bg-main-two-600 p-16 text-white"
                >
                  <span className="icon text-2xl d-xs-flex d-none"><i className="ph ph-dots-nine" /></span>
                  <span className="d-sm-flex d-none">All</span> Categories
                  <span className="arrow-icon text-xl d-flex"><i className="ph ph-caret-down" /></span>
                </button>
                <div className={`responsive-dropdown cat common-dropdown d-lg-none d-block nav-submenu p-0 submenus-submenu-wrapper shadow-none border border-gray-100 ${activeCategory && "active"}`}>
                  <button
                    onClick={() => { handleCategoryToggle(); setActiveIndexCat(null); }}
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    <i className="ph ph-x" />
                  </button>
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/"><img src="src/assets/images/logo/logo.png" alt="Logo" /></Link>
                  </div>
                  <ul className="scroll-sm p-0 py-8 overflow-y-auto">
                    {categoriesLoading ? (
                      <li className="px-16 py-12">Loading categories...</li>
                    ) : categoriesError ? (
                      <li className="px-16 py-12 text-danger">Failed to load</li>
                    ) : (
                      categoriesData?.categories?.map((cat, index) => (
                        <li
                          key={cat.id}
                          onClick={() => handleCatClick(index)}
                          className={`has-submenus-submenu ${activeIndexCat === index ? "active" : ""}`}
                        >
                          <Link to="#" className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0">
                            <span>{cat.name}</span>
                            <span className="icon text-md d-flex ms-auto">
                              <i className="ph ph-caret-right" />
                            </span>
                          </Link>

                          <div className={`submenus-submenu py-16 ${activeIndexCat === index ? "open" : ""}`}>
                            <h6 className="text-lg px-16 submenus-submenu__title">{cat.name}</h6>

                            <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                              {cat.children?.length > 0 ? (
                                cat.children.map(child => (
                                  <li key={child.id}>
                                    <Link to={`/shop?category=${child.slug}`}>{child.name}</Link>
                                  </li>
                                ))
                              ) : (
                                <li>
                                  <Link to={`/shop?category=${cat.slug}`}>View All</Link>
                                </li>
                              )}
                            </ul>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div className={`category main on-hover-item bg-main-600 text-white ${category === true ? "d-block" : "d-none"}`}>
                <button type="button" className="category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-white">
                  <span className="icon text-2xl d-xs-flex d-none"><i className="ph ph-dots-nine" /></span>
                  <span className="d-sm-flex d-none">All</span> Categories
                  <span className="arrow-icon text-xl d-flex"><i className="ph ph-caret-down" /></span>
                </button>
                <div className="responsive-dropdown on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper">
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/"><img src="assets/images/logo/logo.png" alt="Logo" /></Link>
                  </div>
                  <ul className="scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto">
                    {categoriesLoading ? (
                      <li className="px-16 py-12">Loading...</li>
                    ) : categoriesError ? (
                      <li className="px-16 py-12 text-danger">Error loading</li>
                    ) : (
                      categoriesData?.categories?.map(cat => (
                        <li key={cat.id} className="has-submenus-submenu">
                          <Link to="#" className="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0">
                            <span className="text-xl d-flex">
                              <i className="ph ph-brandy" />
                            </span>
                            <span>{cat.name}</span>
                            <span className="icon text-md d-flex ms-auto">
                              <i className="ph ph-caret-right" />
                            </span>
                          </Link>

                          <div className="submenus-submenu py-16">
                            <h6 className="text-lg px-16 submenus-submenu__title">{cat.name}</h6>

                            <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                              {cat.children?.length > 0 ? (
                                cat.children.map(child => (
                                  <li key={child.id}>
                                    <Link to={`/shop?category=${child.slug}`}>{child.name}</Link>
                                  </li>
                                ))
                              ) : (
                                <li>
                                  <Link to={`/shop?category=${cat.slug}`}>View All</Link>
                                </li>
                              )}
                            </ul>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              {/* Desktop nav */}
              <div className="header-menu d-lg-block d-none">
                <ul className="nav-menu flex-align">

                  {/* Home — plain NavLink, no dropdown */}
                  <li className="nav-menu__item">
                    <NavLink
                      to="/"
                      className={({ isActive }) => `nav-menu__link${isActive ? " activePage" : ""}`}
                    >
                      Home
                    </NavLink>
                  </li>

                  <DropdownNavItem label="Shop" items={SHOP_NAV} />
                  <DropdownNavItem label="Pages" items={PAGES_NAV} badge="New" badgeColor="bg-warning-600" />
                  <DropdownNavItem label="Vendors" items={VENDORS_NAV} badge="New" badgeColor="bg-tertiary-600" />
                  <DropdownNavItem label="Blog" items={BLOG_NAV} />

                  <li className="nav-menu__item">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) => `nav-menu__link${isActive ? " activePage" : ""}`}
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Header right */}
            <div className="header-right flex-align">
              <div className="select-dropdown-for-home-two d-lg-block d-none">
                <LocaleSelectors
                  language={selectedLanguage} onLanguage={setSelectedLanguage}
                  currency={selectedCurrency} onCurrency={setSelectedCurrency}
                />
              </div>

              {/* Mobile icon row */}
              <div className="me-8 d-lg-none d-block">
                <div className="header-two-activities flex-align flex-wrap gap-32">
                  <button onClick={() => setActiveSearch(v => !v)} type="button" className="flex-align search-icon d-lg-none d-flex gap-4 item-hover-two">
                    <span className="text-2xl text-white d-flex position-relative item-hover__text">
                      <i className="ph ph-magnifying-glass" />
                    </span>
                  </button>
                  {[
                    { to: "/account", icon: "ph ph-user", badge: null, label: "Profile" },
                    { to: "/wishlist", icon: "ph ph-heart", badge: "2", label: "Wishlist" },
                    // { to: "/cart", icon: "ph-fill ph-shuffle", badge: "2", label: "Compare" },
                    { to: "/cart", icon: "ph ph-shopping-cart-simple", badge: "2", label: "Cart" },
                  ].map(({ to, icon, badge, label }) => (
                    <Link key={label} to={to} className="flex-align flex-column gap-8 item-hover-two">
                      <span className="text-2xl text-white d-flex position-relative me-6 mt-6 item-hover__text">
                        <i className={icon} />
                        {badge && (
                          <span className="w-16 h-16 flex-center rounded-circle bg-main-two-600 text-white text-xs position-absolute top-n6 end-n4">
                            {badge}
                          </span>
                        )}
                      </span>
                      <span className="text-md text-white item-hover__text d-none d-lg-flex">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <button onClick={handleMenuToggle} type="button" className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex">
                <i className="ph ph-list" />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default HeaderTwo;
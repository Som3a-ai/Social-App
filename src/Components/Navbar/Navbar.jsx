import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  DropdownSection,
} from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/route.png";
import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";

export default function MyNavbar() {
  const {setuserToken , userInfo } = useContext(TokenContext);
  const navigate = useNavigate();
   const defaultImg =
    "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png";



  function logOut() {
    localStorage.removeItem("userToken");
    setuserToken(null);
    navigate("/");
  }



  return (
    <Navbar
      classNames={{
        wrapper:
          "mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3",
        brand: "flex items-center gap-3",
        base: "shadow",
      }}
    >
      <NavbarBrand>
        <img src={logo} alt="" className="h-9 w-9 rounded-xl object-cover" />

        <p className="font-extrabold text-lg hidden sm:block ">ROUTE POSTS</p>
      </NavbarBrand>

      <NavbarContent
        className="flex gap-1  items-center  overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5"
        justify="center"
      >
        <NavbarItem>
          <NavLink
            to="/home"
            className="flex items-center gap-1.5 rounded-xl hover:bg-white transition duration-100 px-2.5 py-2 text-sm font-extrabold hover:text-slate-900 text-slate-600"
          >
            <i className="fa-regular fa-home text-lg"></i>
            <span className="hidden sm:block">Feed</span>
          </NavLink>
        </NavbarItem>

        <NavbarItem>
          <NavLink
            to="/profile"
            className="flex items-center gap-1.5 rounded-xl transition duration-100 px-2.5 py-2 text-sm font-extrabold hover:text-slate-900 text-slate-600 hover:bg-white"
          >
            <i className="fa-regular fa-user text-lg"></i>
            <span className="hidden sm:block">Profile</span>
          </NavLink>
        </NavbarItem>

        <NavbarItem>
          <NavLink
            to="/notifications"
            className="flex items-center gap-1.5 hover:bg-white rounded-xl transition duration-100 px-2.5 py-2 text-sm font-extrabold hover:text-slate-900 text-slate-600"
          >
            <i className="fa-regular fa-message text-lg"></i>
            <span className="hidden sm:block">Notification</span>
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100">
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={userInfo?.photo || defaultImg}
              />

              <p className="hidden sm:block text-sm">{userInfo?.name || "User"}</p>

              <i className="fas fa-bars"></i>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection showDivider>
              <DropdownItem key="profile" className="w-full">
                <Link to="profile">
                <p className="font-semibold">Profile</p>
                </Link>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link to="/settings" className="w-full">
                <p className="font-semibold">settings</p>
                </Link>
              </DropdownItem>
            </DropdownSection>

            <DropdownItem key="logout" color="danger" onClick={() => logOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

//

// class="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)]"

//class="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)]"

//class="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 bg-white text-[#1f6fe5] "

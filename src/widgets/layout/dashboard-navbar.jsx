import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import React from "react";
import { ILNullPhoto } from "@/assets";
import useProfile from "@/hooks/useProfile";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const { dataProfile } = useProfile();

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="md:w-50 mr-auto md:mr-4 ">
            <Typography variant="h2" color="blue-gray" className=" text-right">
              {dataProfile.fullname}
            </Typography>{" "}
            <Typography variant="h6" color="blue-gray" className=" text-right">
              Admin
            </Typography>{" "}
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Avatar
            src={dataProfile.photo ? dataProfile.photo : ILNullPhoto}
            alt="User"
          />
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;

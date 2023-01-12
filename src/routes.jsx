import { ForgetPass, SignIn } from "@/pages/auth";
import { Attendance, Home, User } from "@/pages/dashboard";
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  TableCellsIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import DataCuti from "./pages/dashboard/dataCuti";
import DataIzin from "./pages/dashboard/dataIzin";
import DataSakit from "./pages/dashboard/dataSakit";
import React from "react";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user",
        path: "/user",
        element: <User />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Kelola Data Presensi",
        path: "/Kelola Data Presensi",
        element: <Attendance />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Lihat Data Izin",
        path: "/Data Izin",
        element: <DataIzin />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Lihat Data Sakit",
        path: "/Data Sakit",
        element: <DataSakit />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Lihat Data Cuti",
        path: "/Data Cuti",
        element: <DataCuti />,
      },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "forget password",
        path: "/forget-pass",
        element: <ForgetPass />,
      },
    ],
  },
];

export default routes;

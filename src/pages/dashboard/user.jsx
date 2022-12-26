import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { addUserSchema } from "@/plugins/yup";
import { register } from "@/plugins";
import { rdb } from "@/services";
import { ref, set } from "firebase/database";
import useAllUser from "@/hooks/useAllUser";
import { ILNullPhoto } from "@/assets";
import moment from "moment";

export function User() {
  const { dataAllUser, getAllUser } = useAllUser();

  useEffect(() => {
    getAllUser();
  }, []);

  const [formMode, setFormMode] = useState("");
  const [inputForm, setInputForm] = useState({});

  const showCreateForm = () => {
    setInputForm("");
    setFormMode("create");
  };

  const showUpdateForm = (data) => {
    setInputForm(data);
    setFormMode("update");
  };

  const userAdd = ({ name, email, password, role, pekerjaan }) => {
    register(email, password)
      .then((res) => {
        const data = {
          fullname: name,
          email,
          role,
          uid: res.user.uid,
          photo: null,
          pekerjaan: pekerjaan,
        };
        if (data.role === "admin") {
          set(ref(rdb, `admins/${res.user.uid}`), data);
        } else {
          set(ref(rdb, `users/${res.user.uid}`), data);
        }
        alert("User added successfully");
      })

      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div>
        <Button
          color="blue"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={showCreateForm}
        >
          Add User
        </Button>
      </div>

      {formMode !== "" && (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "admin",
            pekerjaan: "guru",
          }}
          onSubmit={(values) => {
            userAdd(values);
          }}
          validationSchema={addUserSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <Card>
              <CardHeader variant="gradient" color="blue" className="mb-8 p-3">
                <Typography variant="h6" color="white">
                  Add User
                </Typography>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <Typography variant="label">Name</Typography>
                    <input
                      type="text"
                      className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <Typography variant="label" color="red">
                        {errors.name}
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="label">Email</Typography>
                    <input
                      type="text"
                      className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Typography variant="label" color="red">
                        {errors.email}
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="label">Pekerjaan</Typography>
                    <select
                      className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                      onChange={handleChange("pekerjaan")}
                      value={values.pekerjaan}
                    >
                      <option value="guru">Guru</option>
                      <option value="staf">Staf TU</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="label">Password</Typography>
                    <input
                      type="text"
                      className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <Typography variant="label" color="red">
                        {errors.password}
                      </Typography>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Typography variant="label">Role</Typography>
                    <select
                      className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                      onChange={handleChange("role")}
                      value={values.role}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <Button
                    variant="gradient"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={!(dirty && isValid)}
                  >
                    Add User
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </Formik>
      )}

      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tabel User
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Nama User",
                  "Pekerjaan/Role",
                  "Nomor Hp",
                  "Tempat Tanggal Lahir",
                  "Alamat",
                  "",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataAllUser?.map((data, key) => {
                const className = `py-3 px-5 ${
                  key === dataAllUser.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={data?.uid}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={data?.photo ? data.photo : ILNullPhoto}
                          alt={data?.fullname}
                          size="sm"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {data?.fullname}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {data?.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data?.pekerjaan}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {data?.role}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data?.phone_number}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data?.tempat_lahir}, {data.birth_date}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data?.address}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Edit
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tabel Admin
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "blue"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default User;

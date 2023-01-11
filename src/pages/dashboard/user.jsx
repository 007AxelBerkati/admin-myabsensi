import { ILNullPhoto } from "@/assets";
import useAllUser from "@/hooks/useAllUser";
import useAuth from "@/hooks/useAuth";
import { addUserSchema, updateUserSchema } from "@/plugins/yup";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Formik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import React from "react";

export function User() {
  const { dataAllUser, getAllUser } = useAllUser();
  const { signUp, updateUser, deleteUser } = useAuth();

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

  const submitForm = (values) => {
    if (formMode === "create") {
      signUp(values);
    } else if (formMode === "update") {
      updateUser(values, inputForm.uid);
    }

    setFormMode("");
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div>
        <Button
          color="green"
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
        {formMode !== "" && (
          <Button
            color="red"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            style={{ marginLeft: 16 }}
            ripple="light"
            onClick={() => setFormMode("")}
          >
            Cancel
          </Button>
        )}
      </div>

      {formMode !== "" && (
        <Formik
          initialValues={{
            name: inputForm.fullname || "",
            email: inputForm.email || "",
            password: inputForm.password || "",
            role: inputForm.role || "user",
            pekerjaan: inputForm.pekerjaan || "guru",
            alamat: inputForm.address || "",
            noHp: inputForm.phone_number || "",
            tempat_lahir: inputForm.tempat_lahir || "",
            birth_date: inputForm.birth_date
              ? moment(inputForm.birth_date, "DD-MM-YYYY").toDate()
              : moment().toDate(),
          }}
          onSubmit={(values) => {
            submitForm(values);
          }}
          validationSchema={
            formMode === "create" ? addUserSchema : updateUserSchema
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            setFieldValue,
          }) => (
            <Card>
              <CardHeader variant="gradient" color="blue" className="mb-8 p-3">
                <Typography variant="h6" color="white">
                  {formMode === "create" ? "Add User" : "Update User"}
                </Typography>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <Typography variant="small">Name</Typography>
                    <div>
                      <input
                        type="text"
                        className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        style={{ width: "50%" }}
                      />
                    </div>
                    {errors.name && touched.name && (
                      <Typography variant="small" color="red">
                        {errors.name}
                      </Typography>
                    )}
                  </div>
                  {formMode === "create" && (
                    <div className="flex flex-col gap-2">
                      <Typography variant="small">Email</Typography>
                      <div>
                        <input
                          type="text"
                          className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                          onChange={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                          style={{ width: "50%" }}
                        />
                      </div>
                      {errors.email && touched.email && (
                        <Typography variant="small" color="red">
                          {errors.email}
                        </Typography>
                      )}
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <Typography variant="small">Pekerjaan</Typography>
                    <div>
                      <select
                        className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                        onChange={handleChange("pekerjaan")}
                        value={values.pekerjaan}
                        style={{ width: "50%" }}
                      >
                        <option value="guru">Guru</option>
                        <option value="staf">Staf TU</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="small">Alamat</Typography>
                    <div>
                      <input
                        type="text"
                        className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                        onChange={handleChange("alamat")}
                        onBlur={handleBlur("alamat")}
                        value={values.alamat}
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Typography variant="small">Role</Typography>
                    <div>
                      <select
                        className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                        onChange={handleChange("role")}
                        value={values.role}
                        style={{ width: "50%" }}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="small">Tanggal Lahir</Typography>
                    <div>
                      <DatePicker
                        selected={values.birth_date}
                        onChange={(date) => setFieldValue("birth_date", date)}
                        dateFormat="dd/MM/yyyy"
                        className="rounded-md border border-blue-gray-100  p-2"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="small">Tempat Lahir</Typography>
                    <div>
                      <input
                        type="text"
                        className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                        onChange={handleChange("tempat_lahir")}
                        onBlur={handleBlur("tempat_lahir")}
                        value={values.tempat_lahir}
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Typography variant="small">No Hp</Typography>
                    <div>
                      <input
                        type="text"
                        className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                        onChange={handleChange("noHp")}
                        onBlur={handleBlur("noHp")}
                        value={values.noHp}
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                  {formMode === "create" && (
                    <div className="flex flex-col gap-2">
                      <Typography variant="small">Password</Typography>
                      <div>
                        <input
                          type="text"
                          className="rounded-lg border border-blue-gray-200 px-3 py-2 text-blue-gray-500"
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                          style={{ width: "50%" }}
                        />
                      </div>
                      {errors.password && touched.password && (
                        <Typography color="red" variant={"small"}>
                          {errors.password}
                        </Typography>
                      )}
                    </div>
                  )}
                  <Button
                    variant="gradient"
                    fullWidth
                    onClick={handleSubmit}
                    style={{ marginTop: 16, width: "15%" }}
                    disabled={!isValid}
                  >
                    {formMode === "create" ? "Tambah" : "Edit"}
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
                  "edit",
                  "delete",
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
                      <div className="flex items-center gap-4">
                        <Button
                          variant="gradient"
                          color="yellow"
                          onClick={() => {
                            showUpdateForm(data);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="gradient"
                          color="red"
                          onClick={() => {
                            deleteUser(data.uid);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {/* <Card>
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
      </Card> */}
    </div>
  );
}

export default User;

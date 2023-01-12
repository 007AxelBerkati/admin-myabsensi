import { ILNullPhoto } from "@/assets";
import usePresence from "@/hooks/usePresence";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import moment from "moment";
import React, { useEffect } from "react";

const DataCuti = () => {
  const { loading, getPresenceAllUser, presenceAllUser } = usePresence();

  useEffect(() => {
    getPresenceAllUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Data Cuti
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama User", "Pekerjaan", "status", "Jam Masuk", ""].map(
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
              {presenceAllUser?.map((data, key) => {
                const className = `py-3 px-5 ${
                  key === presenceAllUser.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={data.uid}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={data.photo ? data.photo : ILNullPhoto}
                          alt={data.fullname}
                          size="sm"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {data.fullname}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {data.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {"pekerjaan"}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {"role"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={data.masuk ? "green" : "blue-gray"}
                        value={data.masuk ? "Hadir" : "Belum Absen"}
                        className="py-0.5 px-2 text-[11px] font-medium"
                      />
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data.masuk
                          ? moment(data.masuk.date).format("HH:mm")
                          : "--:--"}
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
    </div>
  );
};

export default DataCuti;

import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Formik } from "formik";
import { forgetPassSchema } from "@/plugins/yup";
import { forgetPass } from "@/plugins";

export function ForgetPass() {
  const ForgetPass = ({ email }) => {
    forgetPass(email)
      .then(() => {
        alert("Please check your email");
        window.location.href = "/auth/sign-in";
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("email already in use!");
        } else if (error.code === "auth/network-request-failed") {
          alert("without network connection!");
        } else if (error.code === "auth/invalid-email") {
          alert("invalid E-mail!");
        } else if (error.code === "auth/weak-password") {
          alert("weak password!");
        } else if (error.code === "auth/user-not-found") {
          alert("user not found!");
        } else if (error.code === "auth/wrong-password") {
          alert("wrong password!");
        } else {
          alert("error!");
        }
      });
  };

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgetPassSchema}
          onSubmit={(values) => {
            ForgetPass(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Forget Password
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input
                  type="email"
                  label="Email"
                  size="lg"
                  onChange={handleChange("email")}
                  value={values.email}
                  handleBlur={handleBlur("email")}
                />
                {errors.email && touched.email && (
                  <Typography color="red" variant="small">
                    {errors.email}
                  </Typography>
                )}
                <div className="-ml-2.5">
                  <Checkbox label="I agree the Terms and Conditions" />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth onClick={handleSubmit}>
                  Forget Password
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Back to Login?{" "}
                  <Link to="/auth/sign-in">
                    <Typography
                      as="span"
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold"
                    >
                      Sign in
                    </Typography>
                  </Link>
                </Typography>
              </CardFooter>
            </Card>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ForgetPass;

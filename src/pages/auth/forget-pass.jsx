import useAuth from "@/hooks/useAuth";
import { forgetPassSchema } from "@/plugins/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import React from "react";

export function ForgetPass() {
  const { forgotPass } = useAuth();

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
            forgotPass(values.email);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            dirty,
            isValid,
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
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!(dirty && isValid)}
                >
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

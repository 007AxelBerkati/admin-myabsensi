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
import { loginSchema } from "@/plugins/yup";
import useAuth from "@/hooks/useAuth";

export function SignIn() {
  const { signIn } = useAuth();

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            signIn(values.email, values.password);
          }}
          validationSchema={loginSchema}
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
            <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Sign In
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input
                  type="email"
                  label="Email"
                  size="lg"
                  onChange={handleChange("email")}
                  value={values.email}
                  onBlur={handleBlur("email")}
                />
                {errors.email && touched.email && (
                  <Typography color="red" variant="small">
                    {errors.email}
                  </Typography>
                )}
                <Input
                  type="password"
                  label="Password"
                  size="lg"
                  onChange={handleChange("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                />
                {errors.password && touched.password && (
                  <Typography color="red" variant="small">
                    {errors.password}
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
                  Sign In
                </Button>

                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Forget Password?{" "}
                  <Link to="/auth/forget-pass">
                    <Typography
                      as="span"
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold"
                    >
                      Forget Password
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

export default SignIn;

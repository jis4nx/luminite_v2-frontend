"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";

import { registerUser } from "@app/api/accountApi/accountApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
function SignUp() {
  const [mounted, setMounted] = useState();
  const [registered, setRegistered] = useState(false);
  React.useEffect(() => setMounted(true), []);

  const signUpUser = useMutation(registerUser);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: (values) => {
      let data = { ...values, type: "CUSTOMER" };
      console.log(data);
      signUpUser.mutate(data, {
        onSuccess: () => {
          setRegistered(true);
        },
      });
    },
  });

  return mounted
    ? (
      <>
        <div
          className={registered
            ? "flex items-center gap-1 justify-center text-indigo-700 mt-5"
            : "hidden"}
        >
          <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5" />
          <Typography className="font-semibold" variant="h4">
            Registered Successfully
          </Typography>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-10">
          <Card className="w-96 mx-auto py-3">
            <Typography variant="h5" color="indigo" className="mx-auto">
              Sign Up
            </Typography>
            <CardBody className="flex flex-col gap-4">
              <Input
                color="indigo"
                label="Email"
                size="lg"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <Input
                color="indigo"
                label="Password"
                size="lg"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <Input
                color="indigo"
                label="Confirm Password"
                size="lg"
                name="password2"
                type="password"
                value={formik.values.password2}
                onChange={formik.handleChange}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit" color="indigo">
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                <p className="text-gray-700 font-medium">
                  Already have an account?
                </p>
                <Typography
                  variant="small"
                  color="indigo"
                  className="ml-1 font-normal"
                >
                  <Link href="/account/login">
                    Sign In
                  </Link>
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </form>
      </>
    )
    : null;
}

export default SignUp;

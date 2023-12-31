"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@app/api/accountApi/accountApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@redux/reducers/auth";

function Login() {
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const login = useMutation(loginUser);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login.mutate(values, {
        onSuccess: (res) => {
          dispatch(setUser({ user: values.email, isAuthenticated: true }));
        },
        onError: (error, e) => {
          if (error.response) {
            if (error.response.status === 401) {
              setErr(true);
            } else {
              console.log("Request failed with status:", error.response.status);
            }
          } else if (error.request) {
            console.log("Request made, but no response received.");
          } else {
            console.log("Error setting up the request:", error.message);
          }
          e.preventDefault();
        },
      });
    },
  });
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return mounted
    ? (
      <form onSubmit={formik.handleSubmit} className="mt-10 w-96 mx-auto">
        {err && (
          <Alert
            variant="gradient"
            color="red"
            open={err}
            className="mb-2"
            action={
              <Button
                variant="text"
                color="white"
                size="sm"
                className="!absolute top-3 right-3"
                onClick={() => setErr(false)}
              >
                Close
              </Button>
            }
          >
            Email or password didnt match
          </Alert>
        )}
        <Card className="py-3">
          <Typography variant="h5" color="indigo" className="mx-auto">
            Login
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
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit" color="indigo">
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              <p className="text-gray-700 font-medium">
                New to Luminite V2?
              </p>
              <Typography
                variant="small"
                color="indigo"
                className="ml-1 font-normal"
              >
                <Link href="/account/signup">
                  Sign Up
                </Link>
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    )
    : null;
}

export default Login;

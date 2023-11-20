import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@app/api/accountApi/accountApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ChangePasswordForm() {
  const changePasswordData = useMutation(changePassword);
  const [isError, setIsError] = useState();
  const { user_id } = useSelector((state) => state.profile);

  useEffect(() => {
    let timeoutId;
    if (isError) {
      timeoutId = setTimeout(() => {
        setIsError(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isError]);

  const formik = useFormik({
    initialValues: {
      "password": "",
      "password2": "",
      "old_password": "",
    },
    onSubmit: (values) => {
      const data = { ...values, id: user_id };
      console.log(data);
      changePasswordData.mutate(data, {
        onSuccess: (res) => {
          console.log(res);
        },
        onError: (err) => {
          let msg = err.response.data.old_password ||
            err.response.data.non_field_errors;
          setIsError(msg[0]);
        },
      });
    },
  });
  return (
    <div className="">
      <Typography variant="lead" className="text-site-blue text-md py-3">
        Change Password
      </Typography>
      {isError && <p className="text-red-500 text-sm py-2">{isError}</p>}
      {changePasswordData.isSuccess && (
        <p className="text-green-600 text-sm py-2">
          Password Changed successfully!
        </p>
      )}{" "}
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="New Password"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Input
          type="password"
          name="password2"
          value={formik.values.password2}
          onChange={formik.handleChange}
          placeholder="Confirm Password"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Input
          type="password"
          placeholder="Old Password"
          name="old_password"
          value={formik.values.old_password}
          onChange={formik.handleChange}
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Button type="sumbit" size="sm" className="bg-site-blue">Change</Button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;

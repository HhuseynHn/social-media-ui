/** @format */
"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Button,
  ValidationError,
} from "@/common/components";
import { registerSchema } from "../schema/register-schema";
import { authRegister } from "../service/auth-service";
import { useRouter } from "next/navigation";
import { LuEyeClosed } from "react-icons/lu";
import { PiEye } from "react-icons/pi";
export const Register = () => {
  const [hidePassword, setHidePassword] = useState("password");
  const [visible, setVisible] = useState(false);
  const [hidePasswordRpeat, setHidePasswordRpeat] = useState("password");
  const [visibleRpeat, setVisibleRpeat] = useState(false);
  const router = useRouter();
  const getHidePassword = () => {
    setHidePassword((password) =>
      password === "password" ? "text" : "password"
    );
    setVisible((visble) => !visble);
  };
  const getHidePasswordRepeat = () => {
    setHidePasswordRpeat((passwrd) =>
      passwrd === "password" ? "text" : "password"
    );
    setVisibleRpeat((visible) => !visible);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors)
        .map((error) => error.message)
        .join("\n");

      toast.error(`❌ Validation Error:\n${errorMessages}`, {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    const { userName, password } = data;
    const body = { userName, password };
    const response = await authRegister(body);
    // // console.log("response =", response);
    if (response.success) {
      toast("✅ Register successful! Redirecting...", {
        duration: 3000,
        position: "top-center",
      });
      router.push("/login");
    } else {
      toast(`❌ ${response.message || "Register failed. Please try again"}`, {
        duration: 3000,
        position: "top-center",
        className: "bg-red-500 text-white",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card className="w-[340px]">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Please enter your information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="user-name">User name</Label>
                <Input
                  id="user-name"
                  type="text"
                  placeholder="User name"
                  {...register("userName")}
                />
                {errors.userName && (
                  <ValidationError>{errors.userName.message}</ValidationError>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={hidePassword}
                    {...register("password")}
                  />
                  {visible ? (
                    <LuEyeClosed
                      className="absolute top-[10px] right-[10px] cursor-pointer"
                      onClick={getHidePassword}
                    />
                  ) : (
                    <PiEye
                      className="absolute top-[10px] right-[10px] cursor-pointer"
                      onClick={getHidePassword}
                    />
                  )}
                </div>

                {errors.password && (
                  <ValidationError>{errors.password.message}</ValidationError>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="repeat-password">Repeat password</Label>
                <div className="relative">
                  <Input
                    id="repeat-password"
                    type={hidePasswordRpeat}
                    {...register("repeatPassword")}
                  />

                  {visibleRpeat ? (
                    <LuEyeClosed
                      className="absolute top-[10px] right-[10px] cursor-pointer"
                      onClick={getHidePasswordRepeat}
                    />
                  ) : (
                    <PiEye
                      className="absolute top-[10px] right-[10px] cursor-pointer"
                      onClick={getHidePasswordRepeat}
                    />
                  )}
                </div>

                {errors.repeatPassword && (
                  <ValidationError>
                    {errors.repeatPassword.message}
                  </ValidationError>
                )}
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Do you have an account?{" "}
              <Link href="/login" className="underline text-black">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

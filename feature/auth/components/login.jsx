/** @format */
"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import loginSchema from "../schema/login-schema";
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
import { authLogin } from "../service/auth-service";
import { useRouter } from "next/navigation";
import { PiEye } from "react-icons/pi";
import { LuEyeClosed } from "react-icons/lu";
export const Login = () => {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState("password");
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const getHidePassword = () => {
    setHidePassword((password) =>
      password === "password" ? "text" : "password"
    );
    setVisible((visble) => !visble);
  };
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

    const response = await authLogin(data);
    if (response.success) {
      toast("✅ Login successful! Redirecting...", {
        duration: 3000,
        position: "top-center",
      });
      router.push("/home");
    } else {
      toast(`❌ ${response.message || "Login failed. Please try again"}`, {
        duration: 3000,
        position: "top-center",
        className: "bg-red-500 text-white",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your User Name below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  id="userName"
                  type="userName"
                  placeholder="UserName"
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

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline text-black">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

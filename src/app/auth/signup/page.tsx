"use client";
import React, { useState } from "react";
import { Button } from "~/app/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const signin = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { mutate: signUp } = api.user.createUser.useMutation();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    signUp(
      { email, password, name },
      {
        onError: (error) => {
          setError(error.message);
          setSuccess("");
        },
        onSuccess: (success) => {
          setSuccess(success.success);
          setError("");
          setTimeout(() => {
            router.push("/signin");
          }, 1000);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border-[1px] border-black bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Sign In
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <Button
            type="submit"
            onClick={handleSignUp}
            variant={"destructive"}
            className="text-md w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default signin;

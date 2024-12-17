"use client";
import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <header className="sticky z-40 top-0 bg-transparent backdrop-blur-sm">
      <div className="container">
        <div className="flex justify-between items-center h-20">
          <h2 className="text-3xl md:text-4xl md:leading-none font-semibold tracking-tighter text-center ml-1 md:ml-5 bg-primary/75 text-transparent bg-clip-text">
            WebSketchers
          </h2>
          <div className="mr-5">
            <div className="absolute inset-0 outline outline-4 -outline-offset-4 outline-primary/65 rounded-xl"></div>
          </div>
          <Button className="rounded-xl" >
            <SignInButton />
          </Button>
        </div>
      </div>
    </header>
  );
};

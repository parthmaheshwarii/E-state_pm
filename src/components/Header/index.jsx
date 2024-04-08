"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import "./index.css";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/firebase";
const Header = () => {
  const { signOut, getUser } = useAuth();
  useEffect(() => {
    console.log("currentUser header", auth.currentUser);
  }, []);
  console.log("currentUser", getUser());
  return (
    <header>
      <div className="container">
        <Link href={"/"} className="logo">
          <Image
            src="/college_logo.png.png"
            alt="College Logo"
            height={100}
            width={100}
          />
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/#our-services">Services</Link>
            </li>
            <li>
              <Link href="/#find-us">Find Us</Link>
            </li>
            <li>
              <Link href="/#gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            {getUser() ? (
              <li
                onClick={signOut}
                className="hover:text-[#007bff] cursor-pointer transition-colors "
              >
                Sign Out
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Link href="/dashboard" className="cta-button">
          Dashboard
        </Link>
      </div>
    </header>
  );
};

export default Header;

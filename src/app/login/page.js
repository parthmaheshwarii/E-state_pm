"use client";
import React, { useEffect } from "react";
import "./page.css";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
const Login = () => {
  const router = useRouter();
  const initialValues = {
    email_field: "",
    password_field: "",
  };
  async function logInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  }
  const { login, getUser } = useAuth();
  useEffect(() => {
    console.log(getUser());
    if (getUser()) {
      router.push("/");
    }
  }, []);
  async function handleLogInWithGoogle() {
    const user = await logInWithGoogle();
    // setUser(user);
    console.log({
      uid: "N33p8i1KfrORoyrn5CYsbOcJwuM2",
      email: "mynameismric@gmail.com",
      emailVerified: true,
      displayName: "Mrical Singhal (MriC)",
      isAnonymous: false,
      photoURL:
        "https://lh3.googleusercontent.com/a/ACg8ocJLSjswz7W6VYBhniPE_R5wC9TU569eZGBA8gDWcBfmdCA=s96-c",
      providerData: [
        {
          providerId: "google.com",
          uid: "106991953016949991890",
          displayName: "Mrical Singhal (MriC)",
          email: "mynameismric@gmail.com",
          phoneNumber: null,
          photoURL:
            "https://lh3.googleusercontent.com/a/ACg8ocJLSjswz7W6VYBhniPE_R5wC9TU569eZGBA8gDWcBfmdCA=s96-c",
        },
      ],
      stsTokenManager: {
        refreshToken:
          "AMf-vBzom6p8WGjcihk4zyDqvHSgj9gN-hhOmRN_o_1nrM27Ry9J4_1Y94OyOzwBA8uVlUoL-PJDiBkJ4Ye8RgHbYuGG0yY-OVemTzIrkONgrEEYoU5lfAgX-BZG9Uw72W1d-BjuVvHECWLCXjKmSsuk_p1TqmVGWlP48kfVnzx-Y3cXTGkgTnfkFgMEQ8QKy6uSvkQ12IUG3UWWAB4Nn1QCpenredqL4abufjJmpyG6uYNEz8GFyhagpamVDqKVrY3ECdz7_fzs8kmtFB6UUe8qF2Pm-uUFNBupW_9YnEAPpQFIGERRQJBOyzTmAuOrZzGtohMTF59hg4TXW34uT2Yy3D094GscTxeJ97j5hqpeJxvi8Z05XOEUmpSR_r9euKJ4ugMt73maB7lnq8iYMpY9f_l4mDSwSQgNjwmv1RjjDAJ2aJDLph574h3SOKu3A8emV0TPzRJE",
        accessToken:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjI1OTZmNTJmNTJlZDQ0MDQ5Mzk2YmU3ZGYzNGQyYzY0ZjQ1M2UiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTXJpY2FsIFNpbmdoYWwgKE1yaUMpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pMU2pzd3o3VzZWWUJobmlQRV9SNXdDOVRVNTY5ZVpHQkE4Z0RXY0JmbWRDQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9lc3RhdGUtMjkyYmEiLCJhdWQiOiJlc3RhdGUtMjkyYmEiLCJhdXRoX3RpbWUiOjE3MTE5ODIxOTgsInVzZXJfaWQiOiJOMzNwOGkxS2ZyT1JveXJuNUNZc2JPY0p3dU0yIiwic3ViIjoiTjMzcDhpMUtmck9Sb3lybjVDWXNiT2NKd3VNMiIsImlhdCI6MTcxMTk4MjE5OCwiZXhwIjoxNzExOTg1Nzk4LCJlbWFpbCI6Im15bmFtZWlzbXJpY0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNjk5MTk1MzAxNjk0OTk5MTg5MCJdLCJlbWFpbCI6WyJteW5hbWVpc21yaWNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.YshQBSW09eYG8mN8senW_RQECI5_qSie3lTnPr-OJNrp1WNq5Z72mZVZaMRgPH9TjJu6nsWDkMHJooohdRxw6mDswsR9bSj8CQ6SsgNY-0ru5oWntXTb2W9HbBx0QWWY1cgtqelBxYCtx1r2heGBQlM0uqdx1LamHhvvlRvNsoqLiIykOMAM5A-TDcwnq9lcbGies3W70ZzuOr9rc5ZBYoxZrRWUVvLLVtXahQ7TmEKEdd6jtfS0hvVXLcoOmYJv69ky9pb8IfSn-fccjdeeUTOoyuRI8XYS59Ah5Ju93lFAi8wV66hLnTTdwfWy8tZgYb0QZHxiUNMrwWSyg8wEuw",
        expirationTime: 1711985798363,
      },
      createdAt: "1711982198713",
      lastLoginAt: "1711982198713",
      apiKey: "AIzaSyCxIqyHwRRitDCWWPep0gt4MiiZDwVjrMY",
      appName: "[DEFAULT]",
    });
  }
  const validationSchema = Yup.object({
    email_field: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    password_field: Yup.string().required("Required"),
  });
  const onSubmit = async (values) => {
    const { email_field, password_field } = values;
    console.log("In onSubmit", values);
    try {
      await login(email_field, password_field);
      router.push("/");
      toast.success("Logged in Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="form_container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="shadow-md border rounded-md my-10 flex px-10 py-3 bg-opacity-40 bg-gray-300 flex-col">
          <Link href="/" className="logo_container mx-auto"></Link>
          <div className="title_container">
            <p className="title">Login to your Account</p>
            <span className="subtitle">
              Get started with our app{" "}
              <Link className="text-blue-600 underline" href={"/signup"}>
                Signup
              </Link>
            </span>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email_field">Username</label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#141B34"
                d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
              />
              <path
                strokeLinejoin="round"
                strokeWidth="1.5"
                stroke="#141B34"
                d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
              />
            </svg>
            <Field
              placeholder="name@mail.com"
              title="Inpit title"
              name="email_field"
              type="text"
              id="email_field"
            />
            <ErrorMessage name="email_field" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height={24}
              width={24}
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#141B34"
                d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
              />
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#141B34"
                d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
              />
              <path
                fill="#141B34"
                d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"
              />
            </svg>
            <Field
              placeholder="Password"
              title="Inpit title"
              name="password_field"
              type="password"
              id="password_field"
            />
            <ErrorMessage name="password_field" component="div" />
          </div>
          <button title="Login" type="submit" id="btn-logIn">
            Login
          </button>
          <div className="separator">
            <hr className="line" />
            <span className="text-white">Or</span>
            <hr className="line" />
          </div>
          <button
            title="Login"
            onClick={handleLogInWithGoogle}
            type="submit"
            className="sign-in_ggl"
          >
            {/* <svg
              height={18}
              width={18}
              viewBox="0 0 32 32"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  id="A"
                />
              </defs>
              <clipPath id="B"></clipPath>
              <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                <path fill="#fbbc05" clipPath="url(#B)" d="M0 37V11l17 13z" />
                <path
                  fill="#ea4335"
                  clipPath="url(#B)"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  fill="#34a853"
                  clipPath="url(#B)"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  fill="#4285f4"
                  clipPath="url(#B)"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </g>
            </svg> */}
            <span>LogIn with Google</span>
          </button>

          <p className="note">Terms of use &amp; Conditions</p>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;

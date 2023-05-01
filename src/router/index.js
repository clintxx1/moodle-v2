import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import ErrorPage from "../pages/error";
import { PrivateLayout, PublicLayout } from "./modules";
import Register from "../pages/register";
import Course from "../pages/course";
import Records from "../pages/records";
import Exam from "../pages/exam";
import CreateExam from "../pages/exam/create-exam";
import Profile from "../pages/profile";
import AttemptExam from "../pages/exam/attempt-exam";
import auth from "../lib/services";
import Forecast from "../pages/forecast";
import Accounts from "../pages/accounts";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />} errorElement={<ErrorPage />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
      <Route element={<PrivateLayout />} errorElement={<ErrorPage />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/:id" element={<Course />} />
        {["superadmin", "admin"].includes(auth.getRole()) && (
          <Route path="/exam" element={<Exam />} />
        )}
        {["superadmin", "admin"].includes(auth.getRole()) && (
          <Route path="update-exam/:id" element={<CreateExam />} />
        )}
        <Route path="/exam/:id/attempt" element={<AttemptExam />} />
        {["superadmin", "admin"].includes(auth.getRole()) && (
          <Route path="/create-exam" element={<CreateExam />} />
        )}
        {["superadmin", "admin"].includes(auth.getRole()) && (
          <Route path="/records" element={<Records />} />
        )}
        {["superadmin"].includes(auth.getRole()) && (
          <Route path="/forecast" element={<Forecast />} />
        )}
        {["superadmin"].includes(auth.getRole()) && (
          <Route path="/register-teacher" element={<Register />} />
        )}
        {["superadmin"].includes(auth.getRole()) && (
          <Route path="/accounts" element={<Accounts />} />
        )}
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </>
  )
);

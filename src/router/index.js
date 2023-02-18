import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  useParams,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import ErrorPage from "../pages/error";
import { PrivateLayout, PublicLayout } from "./modules";
import Register from "../pages/register";
import Course from "../pages/course";

// const { id } = useParams();

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
        <Route path="/course">
          <Route path=":id" element={<Course />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </>
  )
);

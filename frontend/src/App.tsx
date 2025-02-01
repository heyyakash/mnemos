import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useState } from "react";
import { routeTree } from "./routeTree.gen";

const router = createRouter({routeTree})

declare module '@tanstack/react-router' {
	interface Register {
		router : typeof router
	}
}

export default function App() {
	return <RouterProvider router={router} />
  }

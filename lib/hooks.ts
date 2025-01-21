import { useState, useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr";
import { fetchAPI, login } from "./api";

export function useUserData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    const parsedUserData = JSON.parse(userData);
    setData(parsedUserData);
  }, []);

  return data;
}

/* export function useTasks(productID: string) {
  const { data, error } = useSWRImmutable("/todos", fetchAPI);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
} */

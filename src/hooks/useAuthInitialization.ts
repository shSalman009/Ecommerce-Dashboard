import { useAppDispatch } from "@/app/hooks";
import { useAuthCheckQuery } from "@/features/auth/authApi";
import { loggedIn } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";

export default function useAuthInitialization() {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading } = useAuthCheckQuery();
  const [authCompleted, setAuthCompleted] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const user = data.payload;

      dispatch(loggedIn(user));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setAuthCompleted(true);
    }
  }, [isLoading]);

  // Return isLoading until authCompleted is true
  return isLoading || !authCompleted;
}

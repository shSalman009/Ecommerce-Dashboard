import { useAppSelector } from "@/app/hooks";

function useAuth() {
  const auth = useAppSelector((state) => state.auth);

  const values = {
    authenticated: !!auth.user,
    user: auth.user,
  };

  return values;
}

export default useAuth;

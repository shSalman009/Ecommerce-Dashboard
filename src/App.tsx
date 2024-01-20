import Layout from "@/components/layouts/Layouts";
import Loading from "@/components/ui/loading";
import useAuthInitialization from "./hooks/useAuthInitialization";

function App() {
  const authChecking = useAuthInitialization();

  return <> {authChecking ? <Loading /> : <Layout />}</>;
}

export default App;

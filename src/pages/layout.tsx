import { Outlet } from "@ice/runtime";
import usePageChange from "@/hook/usePageChange";
import { useEffect } from "react";

export default function Layout() {
  //   usePageChange();
  useEffect(() => {
    // @ts-expect-error
    navigation.addEventListener("navigate", (props) => {
      console.log("page changed");
      console.log(props.destination.url);
    });
  }, []);
  return (
    <div>
      nihao
      <Outlet />
    </div>
  );
}

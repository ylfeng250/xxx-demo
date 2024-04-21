import { Outlet } from "@ice/runtime";
import usePageChange from "@/hook/usePageChange";

export default function Layout() {
  usePageChange();
  return (
    <div>
      nihao
      <Outlet />
    </div>
  );
}

import { autoUpdate } from "@/lib/autoUpdate";
import { useEffect } from "react";
export default function CheckUpdate() {
  useEffect(() => {
    autoUpdate("/", 2 * 1000);
  }, []);
  return (
    <div>
      判断当前页面是否有更新，每 2 秒检测一次，如果有更新则会提示刷新页面
    </div>
  );
}

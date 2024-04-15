/**
 * 切换主题
 */

import { useEffect, useState } from "react";
import { Flex, Select } from "antd";
import styles from "./index.module.css";
type EnumTheme = "light" | "dark" | "os";
export default function ChangeTheme() {
  const [theme, setTheme] = useState<EnumTheme>(
    (localStorage.getItem("--theme--") as EnumTheme) || "light"
  );

  const match = window.matchMedia("(prefers-color-scheme: dark)");
  const handleThemeChange = (value: EnumTheme) => {
    setTheme(value);
    localStorage.setItem("--theme--", value);
    if (value === "os") {
      followOSTheme();
      match.addEventListener("change", followOSTheme);
    } else {
      window.document.documentElement.dataset.theme = value;
      match.removeEventListener("change", followOSTheme);
    }
  };

  const followOSTheme = () => {
    const { matches } = match;
    if (matches) {
      // 匹配到 dark
      window.document.documentElement.dataset.theme = "dark";
    } else {
      window.document.documentElement.dataset.theme = "light";
    }
  };
  const options = [
    {
      value: "light",
      label: "light",
    },
    {
      value: "dark",
      label: "dark",
    },
    {
      value: "os",
      label: "os",
    },
  ];

  useEffect(() => {
    handleThemeChange(theme);
  }, []);
  return (
    <Flex vertical justify="center" gap={20} className={styles.container}>
      <span>当前主题：{theme}</span>
      <Select options={options} value={theme} onChange={handleThemeChange} />
    </Flex>
  );
}

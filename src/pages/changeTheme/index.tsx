/**
 * 切换主题
 */

import { useContext, useEffect, useState } from "react";
import { Flex, Select } from "antd";
import styles from "./index.module.css";
import { ThemeContext } from "@/context";
import DesignTokenCom from "@/component/DesignTokenCom";

export default function ChangeTheme() {
  const [theme, setTheme] = useState<EnumTheme>(
    (localStorage.getItem("--theme--") as EnumTheme) || "light"
  );
  const [themeValue, setThemeValue] = useState<EnumTheme>(
    (localStorage.getItem("--theme--") as EnumTheme) || "light"
  );

  const match = window.matchMedia("(prefers-color-scheme: dark)");
  const handleThemeChange = (value: EnumTheme) => {
    setTheme(value);
    setThemeValue(value);
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
      setThemeValue("dark");
    } else {
      window.document.documentElement.dataset.theme = "light";
      setThemeValue("light");
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
    <ThemeContext.Provider value={{ theme: themeValue }}>
      <Flex vertical justify="center" gap={20} className={styles.container}>
        <span>当前主题：{theme}</span>
        <Select options={options} value={theme} onChange={handleThemeChange} />
        <DesignTokenCom
          designToken={{
            "--font-color": "#00ff00",
          }}
        />
      </Flex>
    </ThemeContext.Provider>
  );
}

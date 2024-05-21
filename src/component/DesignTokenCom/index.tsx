import { ThemeContext } from "@/context";
import { useContext } from "react";
import styles from "./index.module.css";

const darkStyle = {
  "--font-color": "#fff",
  "--bg-color": "#000",
} as React.CSSProperties;

const lightStyle = {
  "--font-color": "#000",
  "--bg-color": "#fff",
} as React.CSSProperties;

export interface DesignTokenComProps {
  designToken?: Record<string, string>; // 设计token
}
export default function DesignTokenCom(props: DesignTokenComProps) {
  const { designToken } = props;
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const defaultDesignToken = theme === "dark" ? darkStyle : lightStyle;
  return (
    <div
      style={{
        ...defaultDesignToken,
        ...designToken,
      }}
      className={styles.bg}
    >
      <h1 className={styles.title}>Hello</h1>
    </div>
  );
}

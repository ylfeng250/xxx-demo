import { Link } from "@ice/runtime";

export default function Home() {
  return (
    <div>
      <h1>一些 Demo</h1>
      <ul>
        <li>
          <Link to="/checkUpdate" target="_blank">
            检查页面是否更新
          </Link>
        </li>
      </ul>
    </div>
  );
}

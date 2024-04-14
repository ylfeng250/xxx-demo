export const DEYAL_UPDATE_INTERVAL = 30 * 1000; // 30 秒

let initJsUrls: string[] = [];

// 获取 html
export async function fetchHtml(
  url: string,
  fetcher = window.fetch
): Promise<string> {
  try {
    const res = await fetcher(url);
    return res.text();
  } catch (error) {
    console.error(error);
    return "";
  }
}

// 提取 HTML 中所有 js 的地址
export function extractJsUrls(html: string): string[] {
  const regex = /<script.*?src="(.*?)"/g;
  const matches = [...html.matchAll(regex)];
  return matches.map((match) => match[1]);
}

export async function needUpdate(targetUrl: string) {
  const html = await fetchHtml(targetUrl);
  let result = false;
  if (html) {
    const newJsUrls = extractJsUrls(html);
    console.log(initJsUrls, newJsUrls);

    if (initJsUrls.length != newJsUrls.length) {
      result = true;
    }

    for (let i = 0; i < newJsUrls.length; i++) {
      if (newJsUrls[i] !== initJsUrls[i]) {
        result = true;
        break;
      }
    }

    if (!initJsUrls.length) {
      result = false;
    }
    initJsUrls = newJsUrls;
  }

  return result;
}

// 每过一段时间检测一次是否需要更新
export function autoUpdate(
  url: string,
  duration: number = DEYAL_UPDATE_INTERVAL
) {
  setTimeout(async () => {
    const willUpdate = await needUpdate(url);

    if (willUpdate) {
      const result = confirm("检测到新版本，是否更新？");
      if (result) {
        window.location.reload();
      }
    }

    autoUpdate(url, duration);
  }, duration);
}

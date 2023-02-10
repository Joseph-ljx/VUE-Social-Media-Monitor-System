import { title } from "@/config/settings";

/**
 * @copyright liaojianxiang 1298508511@qq.com
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-${title}`;
  }
  return `${title}`;
}

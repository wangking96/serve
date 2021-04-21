/*
 * @Version:  ;
 * @Description:  ;
 * @Autor: Full
 * @Date: 2021-04-03 13:04:52
 */

//文档高度
export function getDocumentTop() {
  let bodyScrollTop = document.body ? document.body.scrollTop : 0;
  let documentScrollTop = document.documentElement
    ? document.documentElement.scrollTop
    : 0;
  return bodyScrollTop - documentScrollTop > 0
    ? bodyScrollTop
    : documentScrollTop;
}

//可视窗口高度
export function getWindowHeight() {
  let windowHeight = 0;

  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

//滚动条滚动高度
export function getScrollHeight() {
  let bodyScrollHeight = document.body ? document.body.scrollHeight : 0;
  let documentScrollHeight = document.documentElement
    ? document.documentElement.scrollHeight
    : 0;
  return bodyScrollHeight - documentScrollHeight > 0
    ? bodyScrollHeight
    : documentScrollHeight;
}

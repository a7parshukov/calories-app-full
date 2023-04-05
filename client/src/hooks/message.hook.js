// для работы с уведомлением на экране
// сообщение при помощи toast: https://materializecss.com/toasts.html

import { useCallback } from "react";

function useMessage() {
  return useCallback((text) => {
    if (window.M && text) {
    window.M.toast({ html: text })
  }
 }, [])
}

export default useMessage;
// 在窗口加载完毕后会将所有页面大小变化的回调都调用一次
const windowOnResizingCallbacks = []

; (function () {
    $(document.head).append($.parseHTML(`<style>
        /* 与窗口同大小*/
        .size-as-window {
            width: var(--window-width);
            height: var(--window-height);
        }
    </style>`))

    let updateWindowSize = function () {
        document.body.style.setProperty('--window-width', `${window.innerWidth}px`)
        document.body.style.setProperty('--window-height', `${window.innerHeight}px`)
        windowOnResizingCallbacks.forEach((v) => v(window.innerWidth, window.innerHeight))
    }
    window.addEventListener('resize', updateWindowSize)
    // 初步确定(值有偏差)
    $(() => updateWindowSize())
    // 完全确定(值已经确定)
    window.addEventListener('load', updateWindowSize)
})()

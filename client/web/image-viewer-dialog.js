{
    $(document.body).append($.parseHTML(`<style>
        #image-viewer-dialog::part(panel) {
            background: rgba(0, 0, 0, 0) !important;
            padding: 0 !important;
        }

        #image-viewer-dialog>mdui-button-icon[icon=close] {
            z-index: 114514;
            position: fixed;
            top: 15px;
            right: 15px;
        }

        #image-viewer-dialog>mdui-button-icon[icon=download] {
            z-index: 114514;
            position: fixed;
            top: 15px;
            right: 65px;
        }
    </style>
    <mdui-dialog id="image-viewer-dialog" fullscreen="fullscreen">
        <mdui-button-icon icon="download"
            onclick="downloadFromUrl($('#image-viewer-dialog-inner > *').attr('src')).catch((e) => mdui.snackbar({message: '无法下载, 也许是被拒绝了吧?', closeOnOutsideClick: true}))">
        </mdui-button-icon>
        <mdui-button-icon icon="close" onclick="this.parentNode.open = false">
        </mdui-button-icon>
        <pinch-zoom id="image-viewer-dialog-inner" class="size-as-window">
        </pinch-zoom>
    </mdui-dialog>`))
}

export default function openImageViewerDialog(src) {
    $('#image-viewer-dialog-inner').empty()

    let e = new Image()
    e.src = src
    e.onerror = () => {
        $('#image-viewer-dialog-inner').empty()
        $('#image-viewer-dialog-inner').append($.parseHTML(`<mdui-icon name="broken_image" style="font-size: 2rem;"></mdui-icon>`))
    }
    $('#image-viewer-dialog-inner').append(e)

    e.onload = () => $('#image-viewer-dialog-inner').get(0).setTransform({
        scale: 0.6,
        x: $(window).width() / 2 - (e.width / 4),
        y: $(window).height() / 2 - (e.height / 3),
    })
    $('#image-viewer-dialog').get(0).open = true
}

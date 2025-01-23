{
    $(document.body).append($.parseHTML(`<style>
        #image-viewer-dialog::part(panel) {
            background: rgba(0, 0, 0, 0) !important;
            padding: 0 !important;
        }

        #image-viewer-dialog > mdui-button-icon[icon=close] {
            z-index: 114514;
            position: fixed;
            top: 15px;
            right: 15px;
        }

        #image-viewer-dialog > mdui-button-icon[icon=open_in_new] {
            z-index: 114514;
            position: fixed;
            top: 15px;
            right: 65px;
        }

        #image-viewer-dialog > mdui-button-icon[icon=download] {
            z-index: 114514;
            position: fixed;
            top: 15px;
            right: 115px;
        }
    </style>
    <mdui-dialog id="image-viewer-dialog" fullscreen="fullscreen">
        <mdui-button-icon icon="download">
        </mdui-button-icon>
        <mdui-button-icon icon="open_in_new" onclick="window.open($('#image-viewer-dialog-inner > *').attr('src'), '_blank')">
        </mdui-button-icon>
        <mdui-button-icon icon="close" onclick="this.parentNode.open = false">
        </mdui-button-icon>
        <pinch-zoom id="image-viewer-dialog-inner" class="size-as-window">
        </pinch-zoom>
    </mdui-dialog>`))
}

export default function openImageViewerDialog(src, downloadCallback) {
    $('#image-viewer-dialog-inner').empty()

    let _ = $('#image-viewer-dialog > mdui-button-icon[icon=download]')[downloadCallback ? 'show' : 'hide']()
    if (downloadCallback) _.click(() => downloadCallback(src))

    let e = new Image()
    e.src = src
    e.onerror = () => {
        $('#image-viewer-dialog-inner').empty()
        $('#image-viewer-dialog-inner').append($.parseHTML(`<mdui-icon name="broken_image" style="font-size: 2rem;"></mdui-icon>`))
    }
    $('#image-viewer-dialog-inner').append(e).click(function() {
        if (this.id == 'image-viewer-dialog-inner') $('#image-viewer-dialog').get(0).open = false
    })

    e.onload = () => $('#image-viewer-dialog-inner').get(0).setTransform({
        scale: 0.6,
        x: $(window).width() / 2 - (e.width / 4),
        y: $(window).height() / 2 - (e.height / 3),
    })
    $('#image-viewer-dialog').get(0).open = true
}

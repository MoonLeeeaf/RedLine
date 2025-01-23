import loadTemplate from './template-loader.js'

await loadTemplate('message-view-template')

class MessageNormal extends HTMLElement {
    static observedAttributes = ['avatar', 'sender-name', 'sender-id', 'msg', 'direction']
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })
    }
    onHeadImageClick() {

    }
    connectedCallback() {
        const shadow = this.shadowRoot

        shadow.appendChild($('#message-normal-template').get(0).content.cloneNode(true))

        $(shadow).find('#sender-name-left').hide()

        $(shadow).find('#avatar').click(function() {
            onHeadImageClick()
        })

        this.update()
    }
    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.update()
    }
    update() {
        const shadow = this.shadowRoot

        // 消息视图的的左右方向
        let isRightDirection = this.getAttribute('direction') == 'right'
        $(shadow).find('#_direction_1').css('justify-content', isRightDirection ? 'flex-end' : 'flex-start')
        $(shadow).find('#_direction_2').css('justify-content', isRightDirection ? 'flex-end' : 'flex-start')

        $(shadow).find('#_direction_3').css('align-self', isRightDirection ? 'flex-end' : 'flex-start')
        $(shadow).find('#_direction_3').css('margin-left', isRightDirection ? '' : '55px')
        $(shadow).find('#_direction_3').css('margin-right', isRightDirection ? '55px' : '')

        $(shadow).find('#sender-name-left')[isRightDirection ? 'show' : 'hide']()
        $(shadow).find('#sender-name-right')[isRightDirection ? 'hide' : 'show']()

        // 头像
        let avatar = $(shadow).find('#avatar')
        this.hasAttribute('avatar') ? avatar.attr('src', this.getAttribute('avatar')) : avatar.text((this.getAttribute('sender-name') || '').substring(0, 1))

        // 发送者
        $(shadow).find('#sender-name-left').text(this.getAttribute('sender-name'))
        $(shadow).find('#sender-name-right').text(this.getAttribute('sender-name'))
        $(shadow).find('#sender-id').text(this.getAttribute('sender-id'))

        // 消息
        this.hasAttribute('msg') && $(shadow).find('#msg').text(this.getAttribute('msg'))
    }
}

class MessageSystem extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        const shadow = this.shadowRoot
        shadow.appendChild($('#message-system-template').get(0).content.cloneNode(true))
    }
}

class MessageHolder extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        const shadow = this.shadowRoot
        shadow.appendChild($('#message-holder-template').get(0).content.cloneNode(true))
    }
    addMessage({ senderId = '', senderName = '', msg = '', avatar, direction = 'left' }, atStart) {
        const v = new MessageNormal()
        $(v).attr('sender-id', senderId).attr('sender-name', senderName).attr('avatar', avatar).attr('direction', direction).text(msg)
        $(this)[atStart ? 'prepend' : 'append'](v)
    }
    addSystemMessage(msg, atStart) {
        const v = new MessageSystem()
        $(v).text(msg)
        $(this)[atStart ? 'prepend' : 'append'](v)
    }
    getMessages(withSystemMessage) {
        let ls = []
        $(this).find('message-normal' + withSystemMessage ? ', message-system' : '').each((_i, e) => {
            let a = $(e)
            ls.push({
                senderName: a.attr('sender-name'),
                avatar: a.attr('avatar'),
                senderId: a.attr('sender-id'),
                direction: a.attr('direction'),
            })
        })
    }
}

customElements.define('message-normal', MessageNormal)
customElements.define('message-system', MessageSystem)
customElements.define('message-holder', MessageHolder)

class MessageImg extends HTMLElement {
    constructor() {
        super()
    }
    onImageClick() {

    }
    connectedCallback() {
        let self = this
        let e = new Image()
        e.style.maxWidth = "70%"
        e.style.maxHeight = "90%"
        e.style.marginTop = "13px"
        e.style.borderRadius = "var(--mdui-shape-corner-medium)"
        e.src = $(this).attr('src')
        e.alt = $(this).attr('alt')
        e.onerror = () => {
            $(this).html(`<br/><mdui-icon name="broken_image" style="font-size: 2rem;"></mdui-icon>`)
            $(this).attr('alt', '图像损坏')
        }
        e.onclick = () => {
            self.onImageClick(e.src)
        }
        this.appendChild(e)
    }
}

customElements.define('message-img', MessageImg)

export {
    MessageHolder,
    MessageNormal,
    MessageSystem,
    MessageImg,
}

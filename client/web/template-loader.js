export default function loadTemplate(template_id) {
    return new Promise(function (resolve) {
        $(document.body).append($.parseHTML(`<div id="${template_id}"></div>`))
        $('#' + template_id).load(template_id + '.html', () => resolve())
    })
}

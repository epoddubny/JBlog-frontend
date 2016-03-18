/**
 * Created by eugene on 18.03.16.
 */
module.exports = function(marked) {
    // basic config for marked library - this will provide us with GitHub flavored markdown
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false, // if false -> allow plain old HTML ;)
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
            if (lang) {
                return hljs.highlight(lang, code).value;
            } else {
                return hljs.highlightAuto(code).value;
            }
        }
    });
};
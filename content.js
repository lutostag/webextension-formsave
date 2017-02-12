console.log('setting up');
var textareas = document.querySelectorAll("textarea");
textareas.forEach(function(textarea) {
    textarea.addEventListener('click', changeHandler);
});
console.log(textareas.length);

function changeHandler(calledEvent) {
    console.log('changed');
    target = calledEvent.target;
    var item = {
        url: document.URL,
        id: target.id,
        time: new Date(),
        content: target.value
    };
    var key = item.url + '##' + item.id;
    console.log(key);
    console.log(item);
    browser.storage.local.set({[key]: item});
}

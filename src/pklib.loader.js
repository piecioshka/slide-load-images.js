/**
 * @author Piotr Kowalski piecioshka@gmail.com
 */
loader = this.loader || {};

loader.item = 0;

loader.started = false;

loader.next = function () {
    loader.item++;
    if (loader.item >= config.images.length) {
        loader.item = 0;
    }
};

loader.Img = function (src) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = "Obrazek";
    return img;
};

loader.init = function() {
    log("[f] loader.init()");
    
    loader.slideshow();
};

loader.slideshow = function () {
    log("[f] loader.slideshow({ element: " + loader.item + "})");
    
    var plh = pklib.dom.byId(config.placeholder),
        src = config.images[loader.item],
        pic = new loader.Img(src),
        inserted = pklib.dom.insert(pic, plh);
    
    pklib.event.add(inserted, "load", function (element) {
        loader.started && plh.removeChild(plh.firstChild);
        loader.started = true;
        
        setTimeout(function () {
            loader.slideshow();
        }, config.interval);
    });
    
    loader.next();
};

pklib.event.add(window, "load", loader.init);

log("file pklib.loader.js");

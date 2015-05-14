'use strict';

module.exports = function (ret, conf, settings, opt) {
    var r = /fis__extras__uri\((.+)\)/g;
    
    fis.util.map(ret.src, function(subpath, file) {
        var setFlag;
        if (file.isHtmlLike) {
            var c = file._content.replace(r, function(origin, target) {
                var url = '';
                
                fis.util.map(ret.src, function(sub, f) {
                    if (sub.indexOf(target) > -1 && f.isImage()) {
                        url = f.getUrl(opt.md5, opt.domain);
                        (url && !setFlag) && (setFlag = true);
                        return true;
                    }
                });

                return url || '';
            });

            if (setFlag) {
                file.setContent(c);
            }
        }
    });
};
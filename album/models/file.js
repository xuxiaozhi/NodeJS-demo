var fs=require("fs");

exports.getAlbums=function (callback) {
   fs.readdir("./uploads",function (err,files) {
       if(err){
            callback("找不到uploads文件夹",null)
       }
        var allAlbums=[];
       (function iterator(i) {
           if(i==files.length){
               callback(null,allAlbums);
               return;
           }
           fs.stat("./uploads/"+files[i],function (err,stats) {
               if(err){
                   callback("找不到文件"+files[i],null)
               }
               if(stats.isDirectory()){
                   allAlbums.push(files[i])
               }
               iterator(i+1);

           })
       })(0)
   })
}

exports.getAllImgByAlbumName=function (albumName,callback) {
    fs.readdir("./uploads/"+albumName,function (err,files) {
        if(err){
            callback("文件夹"+albumName,null);
            return;
        }
        var allImages=[];
        (function iterator(i) {
            if(i==files.length){
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],function (err,stats) {
                if(err){
                    callback("找不到文件"+files[i],null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i])
                }
                iterator(i+1);

            })
        })(0)
    })
}
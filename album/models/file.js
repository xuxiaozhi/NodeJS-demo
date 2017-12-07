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
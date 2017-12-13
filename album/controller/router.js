var file=require("../models/file.js");
var formidable = require('formidable');
var path=require("path");
var fs=require("fs");

exports.showIndex=function (req,res) {
    file.getAlbums(function (err,allAlbums) {
        if(err){
            res.send(err);
            return;
        }
        res.render("index",{
            "albums":allAlbums
        });
    })
}

exports.showAlbum=function (req,res,next) {
    var albumName=req.params.albumName;
    file.getAllImgByAlbumName(albumName,function (err,imagesArray) {
        if(err){
            next();
            return;
        }
        res.render('album',{
            "albumname":albumName,
            "images":imagesArray
        })
    })
}

exports.showUp=function (req,res) {
    file.getAlbums(function (err,allAlbums) {
        if(err){
            res.send(err);
            return;
        }
        res.render('up',{
            "album":allAlbums
        })
    })

}

exports.doPost=function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+"/../temp");
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);

        //改名
        if(err){
            next();
            return;
        }

        var size=parseInt(files.image.size);
        if(size>1024){
            fs.unlink(files.image.path);
            return;
        }

        var ttt=parseInt(Math.random()*89999+10000);
        var ext=path.extname(files.image.name)
        var folder=fields.folder;
        var oldPath=files.image.path;
        var newPath=path.normalize(__dirname+"/../uploads/"+folder+"/"+ttt+ext);
        fs.rename(oldPath,newPath,function (err) {
            if(err){
                res.send("改名失败");
            }
        })


    });

    res.send("成功");
}
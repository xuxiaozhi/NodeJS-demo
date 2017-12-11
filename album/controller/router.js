var file=require("../models/file.js");

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
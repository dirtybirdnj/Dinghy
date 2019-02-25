'use strict'

var fs = require('fs');
var gphoto2 = require('gphoto2');

function findFirst(callback){
    
    try{
        var GPhoto = new gphoto2.GPhoto2();
        GPhoto.setLogLevel(2);
    } catch(err){

        console.log('error initializing gphoto2');
        return callback(true, null);

    }
    
    try{
        // List cameras / assign list item to variable to use below options
        GPhoto.list(function (list) {

            if (list.length === 0){ 
                return callback(true, null)
            } else {
                let camera = list[0];
                return callback(null, camera);
            }                            
        })

    } catch(err){

        console.log('error trying to list cameras!');
        return callback(true, null);
    }
    

}

function getCameraName(camera){

    return `${camera.model}`;

}



function takePhoto(camera, filePath, timeout, callback){

    console.log('takePhoto')

    if(timeout){
        
        console.log(`Photo will fire in ${(timeout/1000)}sec`);

        setTimeout(takePhoto, timeout, camera, filePath, false);

    } else {

        console.log(`Using: ${camera.model}`);
        console.log('Say Cheese!');
        //Take picture immediately

        camera.takePicture({
            download: true,
            keep: true
            }, function (err, data) {

            if(err){

                console.log('gphoto takePicture err');
                callback(err);

            } else {

                fs.writeFileSync(filePath, data);
    
                //Just return with the filepath created
                callback(null, filePath);
            }

        });

    }        


}

module.exports = {
    findFirst : findFirst,
    takePhoto : takePhoto
}
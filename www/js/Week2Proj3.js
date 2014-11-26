var mblnDeviceReady = false; // Set to true when the device is ready
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

// Initialize onsen
var module = ons.bootstrap('my-app', ['onsen']);
module.controller('AppController', function ($scope) { });
module.controller('PageController', function ($scope) {
    ons.ready(function () {

    });
});


document.addEventListener("deviceready", onDeviceReady, false);
app.initialize();

// Called from the phonegap api deviceready event.
function onDeviceReady() {
    try {
        mblnDeviceReady = true;

        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    } catch (err) {
        alert("Error onDeviceReady: " + err.toString())
    }
}

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
    // Get image handle
    var smallImage = document.getElementById('smallImage');
    
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    smallImage.src = "data:image/jpeg;base64," + imageData;
}



// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    // Get image handle
    var largeImage = document.getElementById('smallImage');

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhotoWithData() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhotoFromAlbum() {
    try{
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: pictureSource.PHOTOLIBRARY
    });

    } catch (err) {
            alert("Error getPhotoFromAlbum: " + err.toString())
    }
}

// Called if something bad happens.
// 
function onFail(message) {
    alert('Failed because: ' + message);
}

//add code here to handle camera

function CaptureCamera() {
    capturePhotoWithData();
}

function showDatePicker(objDateField) {
    try{
var options = {
    date: new Date(),
    mode: 'date'
};

datePicker.show(options, function (date) {
    objDateField.value = date
});
    } catch (err) {
        alert("Error showDatePicker: " + err.toString())
    }

}
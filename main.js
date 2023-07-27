let modelViewer = document.getElementById("modelViewer");

let square = document.querySelector('.shopping-nav');
let manager2 = new Hammer.Manager(square);
let Swipe = new Hammer.Swipe();
manager2.add(Swipe);

let btnShopNow = document.getElementById("show-btn-ui");
let btnMenu = document.querySelector(".shopping-nav");
let btnBuy = document.getElementById("btn-buy");
let productName = document.querySelector(".product-name");
let productPrice = document.querySelector(".product-price");
let productDesc = document.querySelector(".product-desc");
//let watermark = document.getElementById("revez");
//let trialmark = document.querySelector(".trial-watermark");
let logo = document.getElementById("logo");
let popupDisplay = document.getElementById("popupDisplay");
let myDiv = document.getElementById('divSuggest');
let spacing = document.querySelector(".clear");
let preview = document.querySelector(".snapshot-preview");
let previewFrame = document.querySelector(".img-preview");
let imgPreview = document.getElementById('img-snapshot');
let btnShareSS = document.getElementById('btn-share-snapshot');
let btnSaveSS = document.getElementById('btn-save-snapshot');
let btnShare = document.getElementById('btn-share');
let btnPhoto = document.getElementById('btn-photo');
let imgCard = document.getElementById('img-card');
let splashscreen_overlay = document.getElementById("splashscreen-overlay");
let btnPhotoClose = document.getElementById('btn-close');
let btnShowmoreClose = document.getElementById('btn-showmore-close');

btnShopNow.addEventListener("click", function(){ showPopup("lm"); });

btnPhoto.addEventListener("click", takeSnapshot);

btnShowmoreClose.addEventListener("click", function(){ 
    popupDisplay.style.bottom = '-1000px';
    popupDisplay.style.animationName = "card-animate-hide"; 
});

var shareTitle = "";
var shareText = "";
var shareUrl = "";

btnShare.addEventListener("click", async () => {
    try {
        await navigator.share({ 
            title: shareTitle, 
            text: shareText,
            url: shareUrl });
            console.log('Thanks for sharing!');
            submitData("6-ShareSNS-Web");
    } catch (err) {
        console.log( "Share failed:", err.message);
    }
});

var currScale = 1;
var initScale = 0.15;
var deltaX = 0;
var deltaY = 0;
var imgTrackerURL;

var companyUrl = "";
var imgData, imgNode;
var strMime = "image/jpeg";
let strDownloadMime = "image/octet-stream";
var directURL = "https://plonk.revezdigital.com";
var fileType = "";
var maxedOutViews = false;
var jsonData;

let ipaddress;
let latlong = "";

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var re = new RegExp("/<([A-Za-z_{}()/]+(\s|=)*)+>(.*<[A-Za-z/>]+)*");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            if (!re.test(pair[1]))
                return pair[1];
        }
    }
    return ("");
}

function showDetails() {
    window.open(companyUrl, "_blank");
}

manager2.on('swipe', function(e) {
    deltaY = deltaY + e.deltaY;
    var direction = e.offsetDirection;
    var translate3d = 'translate3d(0, ' + deltaY + 'px, 0)';

    // console.log("direction "+direction);
    if (direction === 8) {
        // swipe up
        popupDisplay.style.bottom = '0px';
        popupDisplay.style.animationName = "card-animate-show";
    } else if (direction === 16) {
        // swipe down
        //   popupDisplay.style.display = "none";
        popupDisplay.style.bottom = '-1000px';
        popupDisplay.style.animationName = "card-animate-hide";
    }
});

preview.addEventListener("click", function() {
    // preview.style.display = "none";
});

btnSaveSS.addEventListener("click", function() {
    saveFile(imgData.replace(strMime, strDownloadMime), "screenshot.jpg");
});

$("#myModal").on("show.bs.modal", function() {
    btnPhoto.style.visibility = "hidden";
    btnShopNow.style.visibility = "hidden";
    btnShare.style.visibility = "hidden";

    previewFrame.style.width = (imgPreview.naturalWidth * 0.8) + "px";
    previewFrame.style.height = (imgPreview.naturalHeight * 0.8) + "px";
    //alert(imgPreview.naturalWidth +" : "+imgPreview.naturalHeight);

    if (imgPreview.naturalWidth == 0) {
        previewFrame.style.width = "320px";
        previewFrame.style.height = "500px";
    }

});

$('#myModal').on('hidden.bs.modal', function () {
    btnPhoto.style.visibility = "visible";
    btnShare.style.visibility = "visible";
    btnShopNow.style.visibility = "visible";

    /* if(jsonData.product.shopLinkText != ""){
        btnShopNow.style.visibility = "visible";
    }else{
        btnShopNow.style.visibility = "hidden";
    }

    if(hasPlaced){
        resetPanel.style.visibility = "visible";
    } */
});

function takeSnapshot() {
    setTimeout(function(){
        try {
            imgData = modelViewer.toDataURL(strMime);
    
            preview.style.display = "block";
            imgPreview.src = imgData;
            // console.log(imgData);
        } catch (e) {
            console.log(e);
            return;
        }
    },100);
}
var saveFile = function(strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}

function nativeShare() {
    if (navigator.share) {
        navigator.share({
                title: productName.innerHTML,
                url: jsonData.link
            }).then(() => {
                console.log('Thanks for sharing!');
                submitData("6-ShareSNS-Web");
            })
            .catch(console.error);
    } else {
        shareDialog.classList.add('is-open');
    }
}

function showPopup(hs) {
    popupDisplay.style.display = "block";
    popupDisplay.style.bottom = '0px';
    popupDisplay.style.animationName = "card-animate-show";
    spacing.style.backgroundColor = "#fff";

    //submitData("4-ShopCTA");
}

var startY;
var speed = 0.0001;
var currScale = 1;
var initScale = 0.2;
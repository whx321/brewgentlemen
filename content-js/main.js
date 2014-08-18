/* switch to true for production push */
var pageDisabled = true; 
var hasVisitedConnect = false;
var pageLoadTime;

$( document ).ready(function() {
	console.log("MAIN JS HERE");
    pageLoadTime = getDateFromNow(0);

    // if ( (screen.width <= 1024) || (screen.height <= 768) ) { 
    //     window.location = window.location.href.replace('brewgentlemen.com', 'm.brewgentlemen.com');
    // } 
    // resize for first page load
    loadAjaxPages();
    setupClickListeners();

    if($.cookie("BrewGentlemenStayConnectedCookie")) {
        hasVisitedConnect = true;
    }

    $(".page").hide();
    resetTabs(window.location.hash.replace("#",""));

    if (pageDisabled) {
        if ($.cookie("BrewGentlemenAgeVerificationCookie")) {
            //over 21;
            pageDisabled = false;
        }
        else {
            pageDisabled = true;

            //requires validation
            $("#age-notification").fadeIn(400).removeClass('hidden');
            
            $("#age-notification .notification-response.yes").on("click", function () {
                $.cookie('BrewGentlemenAgeVerificationCookie', 'legal', { expires: getDateFromNow(60) });
                $("#age-notification").fadeOut(400);
                pageDisabled = false;
            });
            $("#age-notification .notification-response.no").on("click", function () {
                $("body").fadeOut(400);
            });
        }
    }

    checkOpenStatus();
});

function checkOpenStatus() {
    //check time
    var now = moment();
    var nowEst = now.tz('America/New_York');
    var day = nowEst.format('dddd');
    var hour = nowEst.format('ha');
    var isPM = hour.indexOf("pm") > -1;
    var hourNumber = parseInt(hour.replace("pm",""), 10);

    if (day === "Wednesday" || day === "Thursday" && isPM && (hourNumber >= 4 && hourNumber <= 9)) {
        console.log("we are open");            
    }
    else if (day === "Friday" || day === "Saturday" && isPM && (hourNumber >= 4 && hourNumber <= 10)) {
        console.log("we are open");            
    }
    else {
        console.log("we are closed");
    }    
}

function setupMailingListForm() {
    $(".mailing-list-link").click(function( event ) {
        showMailingListForm();
    });
}

function showMailingListForm() {
    $.fancybox($("#mailing-list-form").html(),
            {   helpers:  {
            overlay: {
                locked: false
            }
        },
            transitionIn: 'elastic',
            transitionOut: 'elastic',
            padding: '0px',
            afterClose: function() { 
                pageDisabled = false;

            },
            beforeLoad: function() {
                pageDisabled = true;
            }
        }
    );
}

function setupClickListeners() {
    $(".nav-tab a").on("click", function (e) {
        var hashToGo = "";
        var currentHash = window.location.hash.replace("#","");

        // check for home logo click
        if (typeof e.target.href == 'undefined') {
            hashToGo = "home";
        }
        else {
            hashToGo = e.target.href.split("#")[1];
        }

        // do not allow the user to shrink/expand current page bc it make the content jump by ignoring margin/padding
        if (hashToGo === currentHash) {
            return;
        }

        // if current page is showing (it should)
        if ($("#" + currentHash).css('display') != 'none') {

            //slide content up and then we slide next content down within resetTabs
            $("#" + currentHash).slideUp(400, function () {
                //this will slide down the hashToGo
                resetTabs(hashToGo);
            });
        }
    });
}

function resetTabs(hashName) {
    var now = getDateFromNow(0);

    if (hashName === "") {
        hashName = "home";
    }
    window.location.hash = hashName;
    $(".header-nav ul li").removeClass("current-tab");
    $("." + hashName + "-tab").addClass("current-tab");

    //if main element is showing
    if ($("#" + hashName).css('display') == 'none') {
       $("#" + hashName).slideDown(400, function() {
            if (hashName == "home" || hashName == "connect") {
                setupMailingListForm();
            }
       });
    }

    if (hasVisitedConnect === false && (hashName === "connect" || now - pageLoadTime > 60 * 1000)) {
        setupConnectNotification();
    }

    if (hashName === "brewery" && typeof(setupMap) == "function") {
        setupMap();
    }
}

function setupConnectNotification() {
    //show message and then set hasVisitedConnect
    $("#connect-notification").fadeIn(400);
        
    $("#connect-notification .notification-response.stay-updated").on("click", function () {
        $.cookie('BrewGentlemenStayConnectedCookie', 'hasConnected', { expires: getDateFromNow(360) });
        $("#connect-notification").fadeOut(400);
        
        showMailingListForm();
    });

    $("#connect-notification .notification-response.no").on("click", function () {
        //give user a 7 days before seeing the popup again
        $.cookie('BrewGentlemenStayConnectedCookie', 'hasConnected', { expires: getDateFromNow(7) });
        $("#connect-notification").fadeOut(400);
    });

    hasVisitedConnect = true; 
}

function getDateFromNow(numDays) {
    var date = new Date();
    var minutes = 30;
    date.setTime(date.getTime() + (numDays * 24 * 60 * 60 * 1000));

    return date;
}

function getCurrentPageId() {
    //if no hash has been set we assume you are on the home page (the first)
    if (pageDisabled || document.URL.split("#").length === 1) {
        return '#home';
    }
    return '#' + document.URL.split("#")[1];
}

function loadAjaxPages() {
    $('#home .full-page-div .page-area').load('content/home.html');
    $('#connect .full-page-div .page-area').load('content/connect.html');
    $('#shop .full-page-div .page-area').load('content/shop.html');
    $('#brewery .full-page-div .page-area').load('content/brewery.html');
    $('#tap .full-page-div .page-area').load('content/tap.html');
    $('#about .full-page-div .page-area').load('content/about.html');
    $('#rpf .full-page-div .page-area').load('content/rpf.html');
}
            
            
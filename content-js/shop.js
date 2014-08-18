$( document ).ready(function() {
    var WORKSHIRT_ID = 1,
        WORDMARK_ID = 2,
        STICKERS_ID = 3,
        COASTERS_ID = 4,
        ARTPRINTS_ID = 5,
        fancybox;

	console.log("SHOP JS HERE");

	fancybox = $.fancybox;

    $("#fancybox-workshirt").click(function( event ) {
            fancybox($("#workshirt-html").html(),
                {   
                    helpers:  {
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
        });

        $("#fancybox-wordmark-shirt").click(function( event ) {
            fancybox($("#wordmark-shirt-html").html(),
                {   
                    helpers:  {
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
        });

        $("#fancybox-stickers").click(function( event ) {
            fancybox($("#stickers-html").html(),
                {   
                    helpers:  {
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
        });

        $("#fancybox-coasters").click(function( event ) {
            fancybox($("#coasters-html").html(),
                {   
                    helpers:  {
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
        });

        $("#fancybox-art-prints").click(function( event ) {
            fancybox($("#art-prints-html").html(),
                {   
                    helpers:  {
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
        });

    $("#PPMiniCart form").css("left", window.innerWidth - 310);

    $(window).resize(function() {
       $("#PPMiniCart form").css("left", window.innerWidth - 310);
    });
});

function addItem(itemId) {
    if (itemId == WORKSHIRT_ID) {
        var shirtColor = $(".custom-select-menu.workshirt-color").find(".custom-select-option.selected a").html();
        var shirtSize = $(".custom-select-menu.workshirt-size").find(".custom-select-option.selected a").html();
        PAYPAL.apps.MiniCart.addToCart({"business":"thebros@brewgentlemen.com","item_name":"Official workshirt","amount":"60","currency_code":"USD","on0": "Color","os0":shirtColor,"on1": "Size","os1":shirtSize});
    }
    if (itemId == WORDMARK_ID) {
        var shirtStyle = $(".custom-select-menu.wordmark-shirt-style").find(".custom-select-option.selected a").html();
        var shirtSize = $(".custom-select-menu.wordmark-shirt-size").find(".custom-select-option.selected a").html();
        PAYPAL.apps.MiniCart.addToCart({"business":"thebros@brewgentlemen.com","item_name":"Wordmark t-shirt","amount":"20","currency_code":"USD", "on0": "Style", "os0":shirtStyle, "on1": "Size", "os1":shirtSize});
    }
    if (itemId == STICKERS_ID) {
        PAYPAL.apps.MiniCart.addToCart({"business":"thebros@brewgentlemen.com","item_name":"Stickers","amount":"4","currency_code":"USD"});
    }
    if (itemId == COASTERS_ID) {
        PAYPAL.apps.MiniCart.addToCart({"business":"thebros@brewgentlemen.com","item_name":"Coasters","amount":"12","currency_code":"USD"});
    }
    if (itemId == ARTPRINTS_ID) {
        PAYPAL.apps.MiniCart.addToCart({"business":"thebros@brewgentlemen.com","item_name":"Art print","amount":"16","currency_code":"USD"});
    }
    
    fancybox.close();
}

function handleCustomSelectTriggerClick(selectClassName) {
    //hide trigger
    $("." + selectClassName + " .custom-select-trigger").css("display", "none");

    //slide down menu
    $("." + selectClassName + " .custom-select-area").slideDown(200, function() {
        //show menu down
        $("." + selectClassName + " .custom-select-area").css("display", "block");
    });
}

function handleCustomSelectOptionClick(event, selectClassName) {
    var optionValue = null,
        optionValueClass = null;

    if($(event.target).hasClass("custom-select-option")) {
        optionValue = $(event.target).find("a").html();
    }
    else {
        optionValue = $(event.target).html();
    }

    if (optionValue == null) {
        return;
    }

    optionValueClass = optionValue.replace(" ", "-");

    var divToSelect = $("." + selectClassName + " .custom-select-option" + "." + optionValueClass);

    $("." + selectClassName + " .custom-select-trigger a").html(optionValue);
    $("." + selectClassName + " .custom-select-option").removeClass("selected");
    divToSelect.addClass("selected");

    //slide menu up
    $("." + selectClassName + " .custom-select-area").slideUp(200, function() {
        //hide menu
        $("." + selectClassName + " .custom-select-area").css("display", "none");

        //show trigger
        $("." + selectClassName + " .custom-select-trigger").css("display", "block");
    });
}
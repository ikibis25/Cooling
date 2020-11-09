/*
Copyright (c) 2018 
------------------------------------------------------------------


-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var AirConditioning = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			/*-------------- AirConditioning Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.RTL();
			this.ClientSlider();
			this.MainSlider();
			this.DatePicker();
			this.ConutTo();
			this.TestimonialSlider();
			this.ContactFormSubmit();
			
		},
		
		/*-------------- AirConditioning Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		RTL: function () {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if(rtl_attr){
				$('html').find('body').addClass("rtl");	
			}		
		},
		//counter on home page
		ConutTo: function(){
			if($('.timer').length > 0){	
				$('.timer').appear(function() {
					$(this).countTo();
				});
			}
		},
		//Testimonial slider on home page
		TestimonialSlider: function(){
			if($('.cs_testimonial_slider .owl-carousel').length > 0){		
				$('.cs_testimonial_slider .owl-carousel').owlCarousel({
					nav: false,
					margin:30,
					dots: true,
					autoplay:false,
					loop:true,
					responsive:{
						0:{
							items:1
						},
						600:{
							items:1
						},
						768:{
							items:1
						},
						992:{
							items:2
						},
						1200:{
							 items:2
						}
					}
				});
			}
		},
		ClientSlider: function(){
			if($('.cs_client_slider .owl-carousel').length > 0){		
				$('.cs_client_slider .owl-carousel').owlCarousel({
					nav: false,
					margin:30,
					dots: false,
					autoplay:true,
					loop:true,
					responsive:{
						0:{
							items:1
						},
						600:{
							items:2
						},
						768:{
							items:3
						},
						992:{
							items:4
						},
						1200:{
							 items:5
						}
					}
				});
			}
		},
		MainSlider: function(){
			if($('.cs_mainslider_wrapper .owl-carousel').length > 0){	
			  var owl = $('.cs_mainslider_wrapper .owl-carousel');	
			  // Carousel initialization
			  owl.owlCarousel({
				  loop:true,
				  margin:0,
				  navSpeed:300,
				  nav:false,
				  dots:true,
				  autoplay: false,
				  items:1
			  });


			  // add animate.css class(es) to the elements to be animated
			  function setAnimation ( _elem, _InOut ) {
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function () {
				  var $elem = $(this);
				  var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

				  $elem.addClass($animationType).one(animationEndEvent, function () {
					$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
				  });
				});
			  }

			// Fired before current slide change
			  owl.on('change.owl.carousel', function(event) {
				  var $currentItem = $('.owl-item', owl).eq(event.item.index);
				  var $elemsToanim = $currentItem.find("[data-animation-out]");
				  setAnimation ($elemsToanim, 'out');
			  });

			// Fired after current slide has been changed
			  owl.on('changed.owl.carousel', function(event) {

				  var $currentItem = $('.owl-item', owl).eq(event.item.index);
				  var $elemsToanim = $currentItem.find("[data-animation-in]");
				  setAnimation ($elemsToanim, 'in');
			  })

			}
		},
		DatePicker: function(){
			$('#datetimepicker1').datetimepicker();
		},
		//contact form submition
		ContactFormSubmit: function(){
			if($('#send_btn').length > 0){	
				$("#send_btn").on("click", function() {
					var e = $("#ur_name").val();
					var t = $("#ur_mail").val();
					// var ph = $("#ur_phone").val();
					var s = $("#sub").val();
					var r = $("#msg").val();
					$.ajax({
						type: "POST",
						url: "ajaxmail.php",
						data: {
							username: e,
							useremail: t,
					// userphone: ph,
							usersub: s,
							mesg: r
						},
						success: function(n) {
							var i = n.split("#");
							if (i[0] == "1") {
								$("#ur_name").val("");
								$("#ur_mail").val("");
								// $("#ur_phone").val("");
								$("#sub").val("");
								$("#msg").val("");
								$("#err").html(i[1]);
							} else {
								$("#ur_name").val(e);
								$("#ur_mail").val(t);
								// $("#ur_phone").val(ph);
								$("#sub").val(s);
								$("#msg").val(r);
								$("#err").html(i[1]);
							}
						}
					});
				});
			}
		}
	};

	AirConditioning.init();

	// Load Event
	// Loader js
	$(window).on('load', function() {
		jQuery("#cs_preloader_box").fadeOut();
		jQuery("#cs_preloader_wrapper").delay(350).fadeOut("slow");
		//window height
		var hei= $(window).height() - 119;
		$(".cs_mainslider_wrapper").css("height", hei);
		$(".cs_mainslider_wrapper .cs_img").css("height", hei);
	 });

	// Scroll Event
	// fixed menu
	$(window).on('scroll', function () {

	});

    $(window).ready(function(e) {
         $(".cs_gototop").on("click", function() {
			$("html, body").animate({
			scrollTop: 0
			}, 600);
			return false
		});
    });
}(jQuery));
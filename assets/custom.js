
class slideshowSwiper extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.sliderWrapper = this.querySelector(".slideshow__swiper");
      if (!this.sliderWrapper) return;
      const resizeObserver = new ResizeObserver((entries) => this.init());
      resizeObserver.observe(this.sliderWrapper);
      // console.log("testdd",this.sliderWrapper.dataset)
    }
    init() {
      let initial_slide =
        this.sliderWrapper.dataset.initialslide !== undefined
          ? parseInt(this.sliderWrapper.dataset.initialslide)
          : undefined;
      let centered_slides =
        this.sliderWrapper.dataset.centeredslides !== undefined
          ? JSON.parse(this.sliderWrapper.dataset.centeredslides)
          : undefined;
      let effect_fade =
        this.sliderWrapper.dataset.effectfade !== undefined
          ? JSON.parse(this.sliderWrapper.dataset.effectfade)
          : undefined;
      let dottype =
        this.sliderWrapper.dataset.type !== undefined
          ? this.sliderWrapper.dataset.type
          : undefined;
  
      let next = this.querySelector(".swiper-button-next");
      let prev = this.querySelector(".swiper-button-prev");
      let pagination = this.querySelector(".swiper-pagination");
      let scrollbar = this.querySelector(".swiper-scrollbar");
  
      const slider = new Swiper(this.sliderWrapper, {
        effect: effect_fade ? "fade" : "slide",
        centeredSlides: centered_slides ? centered_slides : false,
        slidesPerView: parseInt(this.sliderWrapper.dataset.slidesmobile),
        spaceBetween: parseInt(this.sliderWrapper.dataset.mobilespace),
        grabCursor: true,
        horizontal: true,
        watchSlidesProgress: true,
        draggable:!0,
        autoHeight:!1,
        watchOverflow:!0,
        threshold:10,
        freeMode: JSON.parse(this.sliderWrapper.dataset.freemode),
        loop: JSON.parse(this.sliderWrapper.dataset.loop),
        speed: 700,
        mousewheel: {
          forceToAxis: true
        },
        autoplay: {
          enabled: JSON.parse(this.sliderWrapper.dataset.autoplay),
          disableOnInteraction: false,
          delay: 3000,
        },
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        scrollbar: {
          el: scrollbar,
          hide: false,
          draggable:!0
        },
        pagination: {
          el: pagination,
          clickable: true,
          type: dottype,
          renderBullet: function(index, className) {
            return '<span class="' + className + ' swiper-pagination-bullet--svg-animation"><svg width="28" height="28" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="10" fill="none" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="2" stroke-width="3"></circle></svg></span>';
          }
        },
        breakpoints: {
          359: {
            slidesPerView: parseFloat(this.sliderWrapper.dataset.slidesmobile),
            spaceBetween: parseInt(this.sliderWrapper.dataset.mobilespace),
          },
          768: {
            slidesPerView: parseFloat(this.sliderWrapper.dataset.slidestab),
            spaceBetween: parseInt(this.sliderWrapper.dataset.tabspace),
          },
          1024: {
            slidesPerView: parseFloat(this.sliderWrapper.dataset.slidesdesktop),
            slidesPerGroup: 2,
            spaceBetween: parseInt(this.sliderWrapper.dataset.desktopspace),
            freeMode:!0
          },
        },
      });
  
      return slider;
    }
  }
  customElements.define("slideshow-swiper", slideshowSwiper);




  class NavigationSlider extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
  
      this.slideshow__for = this.querySelector(".slideshow__for");
      this.slideshow__nav = this.querySelector(".slideshow__nav");
  
      if (!this.slideshow__nav) return;
      const resizeObserver = new ResizeObserver((entries) => this.init());
      resizeObserver.observe(this.slideshow__nav);
    }
  
    init(){
  
      let next = this.querySelector(".swiper-button-next");
      let prev = this.querySelector(".swiper-button-prev");
      let pagination = this.querySelector(".swiper-pagination");
  
  
      var slideshow__for = new Swiper (this.slideshow__for, {
        slidesPerView: "auto",
        centeredSlides: true,
        loop: JSON.parse(this.slideshow__nav.dataset.loop)
      });
      
      
      var slideshow__nav = new Swiper (this.slideshow__nav, {
        slidesPerView: 3,
        spaceBetween: 10,
        slideToClickedSlide: true,
        centeredSlides: true,
        loop: JSON.parse(this.slideshow__nav.dataset.loop),
        autoplay: {
          enabled: JSON.parse(this.slideshow__nav.dataset.autoplay),
          delay: parseInt(this.slideshow__nav.dataset.delay),
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
        pagination: {
          el: pagination,
          clickable: true,
        }
      });
      
      slideshow__for.controller.control = slideshow__nav;
      slideshow__nav.controller.control = slideshow__for;
      return true; 
    }
  
  }
  customElements.define("navslider-component", NavigationSlider);





  $(document).on('click', ".video-btn", function(e) {
    e.preventDefault();
    $(".video-popup-overlay,.video-popup-iframe-container,.video-popup-container,.video-popup-close").show();
    
    var srchref='',autoplay='',id=$(this).data('id');
    if($(this).data('type') == 'vimeo') var srchref="//player.vimeo.com/video/";
    else if($(this).data('type') == 'youtube') var srchref="https://www.youtube.com/embed/";
    
    if($(this).data('autoplay') == true) autoplay = '?autoplay=1';
    
    $(".video-popup-iframe").attr('src', srchref+id+autoplay);
    
    $(".video-popup-iframe").on('load', function() {
      $(".video-popup-container").show();
    });
  });
  
  $(".video-popup-close, .video-popup-overlay").on('click', function(e) {
    $(".video-popup-iframe-container,.video-popup-container,.video-popup-close,.video-popup-overlay").hide();
    $(".video-popup-iframe").attr('src', '');
  });



class slideshowMobile extends HTMLElement {
  constructor() {
    super();
     this.init = false;
     this.mobileSLider;
  }
  connectedCallback() {
    this.slideshow__mobile = this.querySelector(".slideshow__mobile");
    if (!this.slideshow__mobile) return;
    const resizeObserver = new ResizeObserver((entries) => this.mobileInit());
    resizeObserver.observe(this.slideshow__mobile);
  }


  mobileInit(){

    let initial_slide =
    this.slideshow__mobile.dataset.initialslide !== undefined
      ? parseInt(this.slideshow__mobile.dataset.initialslide)
      : undefined;
  let centered_slides =
    this.slideshow__mobile.dataset.centeredslides !== undefined
      ? JSON.parse(this.slideshow__mobile.dataset.centeredslides)
      : undefined;
  let effect_fade =
    this.slideshow__mobile.dataset.effectfade !== undefined
      ? JSON.parse(this.slideshow__mobile.dataset.effectfade)
      : undefined;

  let next = this.querySelector(".swiper-button-next");
  let prev = this.querySelector(".swiper-button-prev");
  let pagination = this.querySelector(".swiper-pagination");

    if (window.innerWidth <= 768) {
      if (!this.init) {
        this.init = true;
        this.mobileSLider = new Swiper(this.slideshow__mobile, {
          effect: effect_fade ? "fade" : "slide",
          centeredSlides: centered_slides ? centered_slides : false,
          slidesPerView: parseInt(this.slideshow__mobile.dataset.slidesmobile),
          spaceBetween: parseInt(this.slideshow__mobile.dataset.mobilespace),
          grabCursor: true,
          horizontal: true,
          freeMode: JSON.parse(this.slideshow__mobile.dataset.freemode),
          loop: JSON.parse(this.slideshow__mobile.dataset.loop),
          speed: parseInt(this.slideshow__mobile.dataset.speed),
          autoplay: {
            enabled: JSON.parse(this.slideshow__mobile.dataset.autoplay),
            delay: parseInt(this.slideshow__mobile.dataset.delay),
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: next,
            prevEl: prev,
          },
          pagination: {
            el: pagination,
            clickable: true,
          },
          breakpoints: {
            768: {
              slidesPerView: 4,
            }
          },
        });
      }
    } else if (this.init) {
      this.mobileSLider.destroy();
      this.init = false;
    }
  }
}

  customElements.define("slideshow-mobile", slideshowMobile);





  class slideshowElement extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.sliderWrapper = this.querySelector(".slideshow__swiper");
      if (!this.sliderWrapper) return;
      const resizeObserver = new ResizeObserver((entries) => this.init());
      resizeObserver.observe(this.sliderWrapper);
      // console.log("testdd",this.sliderWrapper.dataset)
    }
    init() {
      let initial_slide =
        this.sliderWrapper.dataset.initialslide !== undefined
          ? parseInt(this.sliderWrapper.dataset.initialslide)
          : undefined;
      let centered_slides =
        this.sliderWrapper.dataset.centeredslides !== undefined
          ? JSON.parse(this.sliderWrapper.dataset.centeredslides)
          : undefined;
      let effect_fade =
        this.sliderWrapper.dataset.effectfade !== undefined
          ? JSON.parse(this.sliderWrapper.dataset.effectfade)
          : undefined;
      let dottype =
        this.sliderWrapper.dataset.type !== undefined
          ? this.sliderWrapper.dataset.type
          : undefined;
  
      let next = this.querySelector(".swiper-button-next");
      let prev = this.querySelector(".swiper-button-prev");
      let pagination = this.querySelector(".swiper-pagination");
      let scrollbar = this.querySelector(".swiper-scrollbar");
  
      const slider = new Swiper(this.sliderWrapper, {
        loop: false,
        grabCursor: true,
        spaceBetween: 16,
        slidesPerGroup: 2,
        slidesPerView: "auto",
        watchSlidesProgress: true,
        draggable:!0,
        autoHeight:!1,
        watchOverflow:!0,
        threshold:10,
        mousewheel:{
          forceToAxis:!0
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          draggable:!0
        },
        breakpoints: {
          0: {
            slidesPerGroup: 1
          },
          769: {
            slidesPerGroup: 2
          },
          992: {
            slidesPerGroup: 2
          },
          1200: {
            slidesPerGroup: 2
          },
          1441: {
            slidesPerGroup: 2,
            slidesPerView: 4,
            freeMode:!0
          }
        }
      });
  
      return slider;
    }
  }
  customElements.define("slideshow-element", slideshowElement);






var my_filter = {};
var s_filter_val = {};
var filter_path = '';


$('.filters__input').change(function () {
  var filter_path = window.location.pathname;
  var s_filter = "";
  var filter_count = 0;

  $('.filters__input:checked').each(function (index) {
    my_filter[index] = $(this).attr('name');
    s_filter_val[index] = $(this).val();
    s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
    filter_count ++;
  });
  
  if($('.filters__input_price:checked').length >= 2){
    filter_count --;
  }

  filter_path = filter_path + "?" + s_filter;
  
  fetch(filter_path + "&section_id=main-collection-products")
      .then((response) => response.text())
      .then((collectionData) => {
        var collection_html = $(collectionData);
        var collection_items = $("#collectionProductGrid", collection_html);
        $("#collectionProductGrid").replaceWith(collection_items);
      });

      // window.location.href = filter_path;

      if (history.pushState) {
        var newurl = filter_path;
        window.history.pushState({path:newurl},'',newurl);
    }
  //  console.log(filter_path);
});

$('.shop__filter-reset, .shop__filter-clear').click(function(){
  var filter_path = window.location.pathname;
  fetch(filter_path + "?section_id=main-collection-products")
      .then((response) => response.text())
      .then((collectionData) => {
        var collection_html = $(collectionData);
        var collection_items = $("#collectionProductGrid", collection_html);
        $("#collectionProductGrid").replaceWith(collection_items);
      });
      $('.filters__input:checked').prop("checked", false);
});

$('.filter-label_price').click(function(){
  $('.filters__input_price').prop("checked", false);
  $(this).parent().find('input').prop("checked", true).trigger('change');
});

$('.shop-filter-trigger').click(function(){
  $('body').addClass('show-filter')
  windowHeight = window.innerHeight + 'px';
  var filter_height = window.innerHeight - 60 + 'px';
  $('.shop__left').css('height', filter_height);
});
$('.btn_filter-apply, .shop__filter-close').click(function(){
  $('body').removeClass('show-filter')
});







// $('.category-selector').change(function () {
//   var filter_path = window.location.pathname;
//   var s_filter = $(this).val();

//   if($(this).val() != null ){
//     filter_path = $(this).val() + "?";
//   }

//   fetch(filter_path + "&section_id=main-collection-products")
//       .then((response) => response.text())
//       .then((collectionData) => {
//         var collection_html = $(collectionData);
//         var collection_items = $("#collectionProductGrid", collection_html);
//         $("#collectionProductGrid").replaceWith(collection_items);
//       });

//       if (history.pushState) {
//         var newurl = filter_path;
//         window.history.pushState({path:newurl},'',newurl);
//     }


// });





$(".category-selector").on('click', function(e) {

      $(this).toggleClass("active");

      if($(this).hasClass('active')){
        $('.collection-list-wrap-mobile').slideDown();
      }else{
        $('.collection-list-wrap-mobile').slideUp();
      }

});



$(".filter-drawer-toggle").on('click', function(e) {
  // $(this).addClass('active');
  $('body').addClass('drawer_open');

});

$(".background-overlay").on('click', function(e) {

  $('body').removeClass('drawer_open');

  $(".filter-drawer-toggle").removeClass('active');

});




$(document).on('click', ".button--filter", function(e) {
  e.preventDefault();

  var filter_path = window.location.pathname;
  var s_filter = "";
  var filter_count = 0;
  $('.mobile-filters__input:checked').each(function (index) {
    my_filter[index] = $(this).attr('name');
    s_filter_val[index] = $(this).val();
    s_filter += '&' + my_filter[index] + '=' + s_filter_val[index];
    filter_count ++;
  });

  filter_path = filter_path + "?" + s_filter;





  if( filter_path.match("&")){


    fetch(filter_path + "&section_id=main-collection-products")
    .then((response) => response.text())
    .then((collectionData) => {
  
      $('body').removeClass('drawer_open');
  
      var collection_html = $(collectionData);
  
      var collection_items = $("#collectionProductGrid", collection_html);
      $("#collectionProductGrid").replaceWith(collection_items);
  
  
  
      if(collection_items.children.length >= 1){
        $('.product-count').text('('+collection_items.children().length+')');
      }
  
      // console.log("Tress", collection_items);
      $('.product-count').show();
      $('.filter-drawer-toggle').addClass("active");
   
  
    });
  
  
    if (history.pushState) {
      var newurl = filter_path;
      window.history.pushState({path:newurl},'',newurl);
  }






  }else{



      fetch(filter_path + "&section_id=main-collection-products")
    .then((response) => response.text())
    .then((collectionData) => {
  
      $('body').removeClass('drawer_open');
  
      var collection_html = $(collectionData);
  
      var collection_items = $("#collectionProductGrid", collection_html);
      $("#collectionProductGrid").replaceWith(collection_items);
  
  
  
      if(collection_items.children.length >= 1){
        $('.product-count').text('('+collection_items.children().length+')');
      }
  
      // console.log("Tress", collection_items);
      $('.product-count').hide();
      $('.filter-drawer-toggle').removeClass("active");
   
  
    });
  
  
    if (history.pushState) {
      var newurl = filter_path;
      window.history.pushState({path:newurl},'',newurl);
  }





  }




  //  console.log(filter_path);



});


var href = $(location).attr("pathname");
var search = $(location).attr("search");

var filter__serach_path = href+""+search

if( filter__serach_path.indexOf("?") > 0  &&  filter__serach_path.indexOf("/collections") != -1 ){

  $('.filter-drawer-toggle').addClass("active");
 

    // console.log("tress", filter__serach_path);

    // console.log("pathname", href);


    fetch(filter__serach_path + "&section_id=main-collection-products")
    .then((response) => response.text())
    .then((collectionData) => {
  
      $('body').removeClass('drawer_open');
  
      var collection_html = $(collectionData);
  
      var collection_items = $("#collectionProductGrid", collection_html);
      $("#collectionProductGrid").replaceWith(collection_items);
  
  
  
      if(collection_items.children.length >= 1){
        $('.product-count').text('('+collection_items.children().length+')');
      }
  
      // console.log("Tress", collection_items);
  
  
    });
  
  
    if (history.pushState) {
      var newurl = filter_path;
      window.history.pushState({path:newurl},'',newurl);
  }
  

}

function Progreassbar(){
  var tabNumber = $("ul.product__tabs").children().length;
  var tabPercentage = parseFloat(100 / tabNumber);
  var currentTab = $("li.current").length;

  var tabProgress = currentTab * tabPercentage;
  var progressBar =$(".bar");
  $(progressBar).css("width", parseFloat(tabProgress) + "%");
}

// Progreassbar();

$(document).ready(function(){
  $('ul.product__tabs li').on('click', function(){
    // get the data attribute
    var tab_id = $(this).attr('data-tab');
    // remove the default classes
     $('ul.product__tabs li').removeClass('active');
     $('.tab-content').removeClass('current');

    // if($(this).hasClass('current')){
    //   $(this).next().removeClass('current');
    // }else{
    //   $(this).prev().addClass('current');
    //   $(this).addClass('current');
    // }
   

      $(this).addClass('active');
     $('#'+tab_id).addClass('current');



  });




  $('.js-menu-toggller').on('click', function(e){
    e.preventDefault();
   $(this).toggleClass('active');
   $("body").toggleClass('menu_open');


  });




  $('.menu-expand-toggler').on('click', function(e){

    e.preventDefault();
    var parent =  $(this).closest('a');

    if($(this).closest('li.has-children').hasClass('active')){
      $(this).closest('.has-children').removeClass('active');
      parent.siblings('.sub-menu').slideUp();
    }
    else{
     $(this).closest('.has-children').addClass('active');
     parent.siblings('.sub-menu').slideDown();
    }

  });


//   $('.readmore').click(function (event) {
//     event.preventDefault();
//     var description = $(this).parents('.slide-read-more').find('.content-wrap');

//     console.log("description", description);
//     console.log("description 2", description.outerHeight );

   
//       if (description.outerHeight  === ''){
//         description.style.height = 'auto';
//       } else if (description.outerHeight === 'auto'){
//         description.style.height = '';
//       }
//       else{
//         description.css('height: 215px');
//       }
//       $(this).text($(this).text() == 'See less' ? 'See more' : 'See less');



//       if($(this).text() == 'See less'){
//         $('html, body').stop().animate({
//           scrollTop: $('.tab-area').offset().top - 100
//            }, 600 );
//       }





// });




$(".slide-read-more").each(function () {
  let box = $(this).find(".content-wrap");
  let minimumHeight = 165; // max height in pixels
  let initialHeight = box.innerHeight();

  // reduce the text if it's longer than 200px
  if (initialHeight > minimumHeight) {
      box.css('height', minimumHeight);
      // $(this).next(".slide-read-more-button.read-more-button").show();
  }

  let readMoreButton = box.next(".readmore");

  readMoreButton.on('click', function () {
      let currentHeight = box.innerHeight();
      let autoHeight = box.css('height', 'auto').innerHeight();
      let newHeight = (currentHeight | 0) === (autoHeight | 0) ? minimumHeight : autoHeight;

      box.css('height', currentHeight).animate({
          height: newHeight
      });

      $('html, body').animate({
          scrollTop: box.offset().top - 150
      });
      $(this).text($(this).text() == 'See less' ? 'See more' : 'See less');
     
  });
});







$('.view-more-btn').click(function (event) {
  event.preventDefault();
  var descriptions = document.querySelectorAll('.content-view-more');
  descriptions.forEach((description, index) => {
    console.log(description.style.height)
    if (description.style.height === ''){
      description.style.height = 'auto';
    } else if (description.style.height === 'auto'){
      description.style.height = '';
    }
    else{
      description.style.height = '215px';
    }
    $(this).text($(this).text() == '...View less' ? '...View more' : '...View less');
  });


});





  
});



  AddReadMore();



$(window).on('resize', function(){

 
    AddReadMore();
   
});

function AddReadMore() {

  if ($(window).width() < 767) { 
  //This limit you can set after how much characters you want to show Read More.
  var carLmt = 113;
  // Text to show when text is collapsed
  var readMoreTxt = "...View More";
  // Text to show when text is expanded
  var readLessTxt = "...View less";


  //Traverse all selectors with this class and manipulate HTML part to show Read More
  $(".add-read-more").each(function () {
     if ($(this).find(".first-section").length)
        return;

     var allstr = $(this).text();
     if (allstr.length > carLmt) {
        var firstSet = allstr.substring(0, carLmt);
        var secdHalf = allstr.substring(carLmt, allstr.length);
        var strtoadd = firstSet + "<span class='second-section'>" + secdHalf + "</span><span class='read-more'  title='Click to Show More'>" + readMoreTxt + "</span><span class='read-less' title='Click to Show Less'>" + readLessTxt + "</span>";
        $(this).html(strtoadd);
     }
  });

  //Read More and Read Less Click Event binding
  $(document).on("click", ".read-more,.read-less", function () {
     $(this).closest(".add-read-more").toggleClass("show-less-content show-more-content");
  });

}
}




class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.updateVariantInput();
    this.updatePrice();
    this.updateImage();
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });


    this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);   

  }


  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updatePrice() {
    const productPrice = this.offsetParent.querySelector(`#price-${this.dataset.section}`);
    productPrice.innerHTML = Shopify.formatMoney(this.currentVariant.price , window.theme.moneyFormat); 

  }


  updateImage() {
    const upsellImage = this.offsetParent.querySelector(`#upsell-image-${this.dataset.section}`);
    if(this.currentVariant.featured_image != null ){
      upsellImage.querySelector('img').src = this.currentVariant.featured_image.src
      upsellImage.querySelector('img').srcset = this.currentVariant.featured_image.src
    }

  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#productForm-${this.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      // input.dispatchEvent(new Event('change', { bubbles: true }));
    });    
  }


  
  toggleAddButton(disable = true, text, modifyClass = true) {


    const productForm = this.offsetParent.querySelector(`#productForm-${this.dataset.section}`);

    const productPrice = this.offsetParent.querySelector(`#price-${this.dataset.section}`);
  

    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"]  span.js-product-form-submit-btn-text');

    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.innerHTML = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.innerHTML = window.variantStrings.addToCart +" - "+Shopify.formatMoney(this.currentVariant.price , window.theme.moneyFormat);
    }

    if (!modifyClass) return;




  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('hidden');
  }



  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

}
customElements.define('variant-selects', VariantSelects);
var _ButtonsMenu = $(".botones");
var _barMenu = $(".menuContainer");
_barMenu.css("opacity",0);

_ButtonsMenu.mouseover(function(){
   $(this).css("background-color","#c47525"); 
});
_ButtonsMenu.mouseout(function(){
   $(this).css("background-color","#ea9036"); 
});


_barMenu.mouseover(function(){
    TweenMax.to(this,0.3,{alpha:1});
});
_barMenu.mouseout(function(){
   TweenMax.to(this,0.5,{alpha:0});
});



$("#loadMovies").attr("src","content/slide1/index.html")
$(function(){
   var c=$('#c').get(0);
   var ctx=c.getContext('2d');
   var $audio=$('#audio');
   var audio=$audio.get(0);
   var audio1=$("#audio1").get(0);
   var sep=40;
   var sr=5;
   var br=40;
   var time=[10,9,8,7,6,5,4,3,2,1,0];
   var time1=[10,9,8,7,6,5,4,3,2,1,0];
   var qizi={};
   var info=$('.info');
   var AI=false;
   var gameState='pause';
   kongbai={};
   
   //坐标转换
   function huan(x){
   	 return (x+0.5)*sep+0.5;
   }
   //画棋盘
   function qipan(){
   	ctx.save();
   	ctx.fillStyle='#BC7905';
   	ctx.fillRect(0,0,600,600);
   	ctx.restore();
   }
   
});
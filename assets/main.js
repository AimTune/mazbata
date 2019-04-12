function download() {
	var download = document.getElementById("download");
	var image = document.getElementById("mazbata").toDataURL("image/png")
		.replace("image/png", "image/octet-stream");
	download.setAttribute("href", image);
	//download.setAttribute("download","archive.png");
}

var url_string = window.location.href;
var url = new URL(url_string);
var AD = url.searchParams.get("adsoyad");
var TCNO = url.searchParams.get("tcno");
var IL = url.searchParams.get("il");
var ILCE = url.searchParams.get("ilce");

var canvas = document.getElementById('mazbata');
var context = canvas.getContext('2d');


var imageObj = new Image();

context.font = 'italic 13pt Calibri';
imageObj.onload = function() {

context.drawImage(imageObj, 0, 0, 600, 400);
context.fillText(AD, 128, 195);
context.fillText(TCNO, 350, 195);
context.fillText(IL, 128, 233);
context.fillText(ILCE, 290, 233);

};

imageObj.src = 'assets/mazbata.jpg';

if (AD != null & TCNO != "" & IL != "" & ILCE != ""){
	document.getElementById("mazbatacontainer").hidden = false;
} else {
	document.getElementById("mazbataolusturcontainer").hidden = false;
}

$.getJSON("assets/il-bolge.json", function(sonuc){
	$.each(sonuc, function(index, value){
		var row="";
		row +='<option value="'+value.il+'">'+value.il+'</option>';
		$("#il").append(row);
	})
});
$("#il").on("change", function(){
	var il=$(this).val();
	$("#ilce").attr("disabled", false).html("<option value=''>Seçin..</option>");
	$.getJSON("assets/il-ilce.json", function(sonuc){
		$.each(sonuc, function(index, value){
			var row="";
			if(value.il==il)
			{
				row +='<option value="'+value.ilce+'">'+value.ilce+'</option>';
				$("#ilce").append(row);
			}
		});
	});
});
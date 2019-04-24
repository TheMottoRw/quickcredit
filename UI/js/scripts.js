const toggleNotification=(elem)=>{
let el=document.querySelectorAll(elem);
for (var d of el){
	d.style.display='block';
	let elemClose=d.querySelectorAll(".close");
	for(let close of elemClose){
		close.onclick=()=>{
		d.style.display='none';
		}
	}
}
}
const initNotification=(elem,notificationElem)=>{
/*
elem:element to set event that needs notification feedback
notificationElem:class of notifications div
*/
let el=document.querySelectorAll(elem);
for (d of el){
d.onclick=()=>{toggleNotification(notificationElem);};
}
}
const toggleModal=()=>{
	var overlayCounter=0;
	overlayElem=document.querySelectorAll(".overlay");
	for(overlay of overlayElem){
		overlay.onclick=()=>{
			toggleModal();
		}
		/*for(viewMore of viewMores){
			viewMore.onclick=()=>{
				toggleModal();
			}
		}*/
		if(overlay.style.display=='none')	
			overlay.style.display='block';
		else
			overlay.style.display='none';
		overlay.getElementsByClassName('close-window')[0].onclick=()=>{
			overlay.style.display='none';
		}
		overlayCounter++;
	}
	overlayCounter=0;
}
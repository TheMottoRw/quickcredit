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

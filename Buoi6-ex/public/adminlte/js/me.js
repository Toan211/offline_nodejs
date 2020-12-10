let pathName = window.location.pathname;
let arrMenu = pathName.split("/");
let currentMenu = arrMenu[2];
console.log(currentMenu);

$('li.nav-item a[data-active="' + currentMenu + '"]').addClass('my-active');
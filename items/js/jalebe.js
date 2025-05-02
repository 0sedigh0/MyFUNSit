function show () {

    //document.getElementById ("test");
    const test1= document.querySelector (".one");
    const test2= document.querySelector (".two");
    const test3= document.querySelector (".three");
    const test4= document.querySelector (".four");
    //const sedigh= document.getElementsByTagName (".test")
    //const number= document.querySelector ("#number")
    
if (test1.textContent/*.trim()*/ === '- - - - -' ) {

    test1.innerHTML= "empty 1";
    test2.innerHTML= "empty 2";
    test3.innerHTML= "empty 3";
    test4.innerHTML= "empty 4";
    
    //number.innerHTML=sedigh.length;
}else{

    test1.innerHTML= "- - - - -";
    test2.innerHTML= "- - - - -";
    test3.innerHTML= "- - - - -";
    test4.innerHTML= "- - - - -";
    
}
}

function show_again () {

    const sedigh= document.getElementsByClassName ("test");
    const text= document.querySelector ("#text");

    text.innerHTML="to be " + sedigh.length + " ta az rakabhay man negah kardy wa baz rakab khordy :)";
    
}

//let isMenuOpen=false

function hideMenu () {

    const divOn=document.getElementById('menuOn');

    if (divOn.style.opacity === '0') {

        divOn.style.opacity='100';
        divOn.style.pointerEvents='auto';
        divOn.style.transform='scale(1.05)';

    }else{

        divOn.style.opacity='0'
        divOn.style.pointerEvents='none';
        divOn.style.transform='scale(1.0)';

    }
}

function darkMode() {

    const darkmod= document.getElementById('moonButton');
    const body= document.body;
    const body2= document.querySelector('.body1');
    const redMode= document.querySelector('.navar');
    const redCard= document.querySelector('.card');
    const redcopy= document.querySelector('.copyPassword');
    const redmoon= document.querySelector('.div-moon');
    const aboutMe= document.querySelector("#about-meBox");

    body.classList.toggle('dark-mod');

    if (body.classList.contains('dark-mod')) {

        darkmod.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" id="sun" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Z"/></svg>
        `;

    }else{

        darkmod.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" id="moon" viewBox="0 0 24 24" width="30" height="30">
                <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM23,17.015a1,1,0,0,0,0,2A1,1,0,0,0,23,17.015Zm-6-4a1,1,0,0,0,0,2A1,1,0,0,0,17,13.015Z"/>
            </svg>
        `;

    }

    window.addEventListener('DOMContentLoaded', () => {
        body2.classList.add('bg-day');
    });
    

    if (body2.classList.contains('bg-day')) {

        body2.classList.remove('bg-day');
        body2.classList.add('bg-night');

        redMode.style.background = 'rgba(11, 80, 177, 0.17)';
        redCard.style.background = 'rgba(21, 47, 87, 0.46)';
        redcopy.style.background = 'rgba(23, 73, 134, 0.46)';
        redmoon.style.background = 'rgba(23, 5, 5, 0.37)';
        redmoon.style.border = 'solid 1px rgba(121, 121, 121, 0.46)';
    
    } else {
    
        body2.classList.remove('bg-night');
        body2.classList.add('bg-day');
    
        redMode.style.background = 'rgba(210, 254, 228, 0.433)';
        redCard.style.background = 'rgba(21, 89, 125, 0.462)';
        redcopy.style.background = 'rgba(21, 89, 125, 0.662)';
        redmoon.style.background = 'rgba(210, 254, 228, 0.433)';
        redmoon.style.border = 'solid 1px rgba(121, 121, 121, 0)';
        
    }
    

}







    /*const menuIcon=document.getElementById('menuIcon');

    if (isMenuOpen) {

        menuIcon.innerHTML= `
        <g>
	        <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"/>
        </g>`;
        isMenuOpen=true;

    }else{

        menuIcon.innerHTML=
        `<g>
            <path d="M480,224H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,224,480,224z"/>
            <path d="M32,138.667h448c17.673,0,32-14.327,32-32s-14.327-32-32-32H32c-17.673,0-32,14.327-32,32S14.327,138.667,32,138.667z"/>
            <path d="M480,373.333H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,373.333,480,373.333z"/>
        </g>`;
        isMenuOpen=false;   

    }*/
        /*function selectQality() {
            // دریافت عناصر
            const video1080 = document.querySelector('.video1080');
            const video720 = document.querySelector('.video720');
    
            // تغییر مقدار opacity برای 1080
            if (video1080.style.opacity === '0') {
                video1080.style.opacity = '1'; // نمایش
            } else {
                video1080.style.opacity = '0'; // مخفی کردن
            }
    
            // تغییر مقدار opacity برای 720
            if (video720.style.opacity === '0') {
                video720.style.opacity = '1'; // نمایش
            } else {
                video720.style.opacity = '0'; // مخفی کردن
            }
        }*/




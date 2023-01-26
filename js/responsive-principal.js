let btn_ver1 = document.querySelector('#mr-btn-ver-mas');
let btn_ver2 = document.querySelector('#cr-btn-ver-mas');

changeText();

window.addEventListener('resize', changeText);

function changeText() {
    if(document.documentElement.clientWidth < 420) {
        btn_ver1.innerHTML = `<i class="bi bi-plus-lg"></i>`;
        btn_ver2.innerHTML = `<i class="bi bi-plus-lg"></i>`;
    } else {
        btn_ver1.textContent = `Ver más`;
        btn_ver2.textContent = `Ver más`;
    }
}

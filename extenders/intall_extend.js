window.addEventListener('DOMContentLoaded', ()=>{
    palette_commands["intall Extensions"] = "openintall_page";//`tab=create_tab();loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/webviewer/web.html");tab.querySelector("#tab_name").textContent = "Browser"`;
});
if(palette_commands !== null){
    palette_commands["intall Extensions"] = "openintall_page";//`tab=create_tab();loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/webviewer/web.html");tab.querySelector("#tab_name").textContent = "Browser"`;
}
function open_install_page(){
    tab=create_tab();
    loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), "/../extends/extenders/inst_page.html");
    tab.querySelector("#tab_name").textContent = "intall_page";
}
window.addEventListener('DOMContentLoaded', ()=>{
    palette_commands["open web"] = `tab=create_tab();loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), extends_path+"/webviewer/web.html");tab.querySelector("#tab_name").textContent = "Browser"`;
});
if(palette_commands !== null){
    palette_commands["open web"] = `tab=create_tab();loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), extends_path+"/webviewer/web.html");tab.querySelector("#tab_name").textContent = "Browser"`;
}
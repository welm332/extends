window.addEventListener('DOMContentLoaded', ()=>{
    palette_commands["md test"] = "print_md()";
});
if(palette_commands !== null){
    palette_commands["md test"] = "print_md()";
}
function print_md(){
    const fpath = tab_opend_path;
    const tab=create_tab();
    loadhtml(document.querySelector(".editor[data-fullpath='"+tab.dataset.fullpath+"']"), extends_path+"/markdown_tester/print.html")
    const read = fs.readFileSync(fpath, 'utf8');
    document.getElementById("mdraw").textContent = read;
    document.getElementById("md_printer").innerHTML = marked(document.getElementById("mdraw").innerHTML);
    
    
}
const before_readFile = readFile;
readFile = (path, replacement = tab_opend_path) =>{
        mimes = {
        "gif"	:"image/gif",
        "jpg" :"image/jpeg",
        "jpeg"	:"image/jpeg",
        "png"	:"image/png",
        "pdf"	:"application/pdf",
    }
    console.log(replacement);
    console.log(path);
    
    const extention = path.substring(path.lastIndexOf(".")+1);
    console.log(extention);
    if(Object.keys(mimes).indexOf(extention) !== -1){
        const tab = document.querySelector(`.tab[data-fullpath="${replacement}"]`);
        path = path.replaceAll("\\", "/");
        if(!fs.existsSync(path)) return;
        const editor = document.querySelector(`.editor[data-fullpath="${replacement}"]`);
        editor.dataset.fullpath = path;
        
        
        tab_widths[path] = tab_widths[replacement];
        editor_dict[path] = editor_dict[replacement];
        
        loadhtml(editor, extends_path+`/bin_open/bin.html`);
        bin_em = document.querySelector(`.editor[data-fullpath="${path}"]`).querySelector("object");
        console.log(bin_em);
        console.log(path)
        console.log(tab)
        tab.dataset.fullpath = path;
        tab.title = path;
        tab.innerHTML = `<div id="tab_name" style="display: inline-block;">${window.requires.path.basename(path.replaceAll("\\", "/"))}</div><button class='delete'>X</button>`;
        tab.querySelector("button").onclick = delete_tab;

        bin_em.type = mimes[extention];
        bin_em.data = path;
    }else{
        before_readFile(path, replacement) 
    }
}
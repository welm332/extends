popups ={}
document.addEventListener("click",()=>{
    if(popups[`.editor[data-fullpath="${tab_opend_path}"]`] !== undefined){
        popups[`.editor[data-fullpath="${tab_opend_path}"]`].hide()
    }
})
function create_popup(word_list,old_prefix){
    console.log(word_list)
    if(word_list.length === 0){return}
    a = document.querySelector(`.editor[data-fullpath="${tab_opend_path}"]`)
    // after = word_list.map((em)=>em["after"]);
    z = popups[`.editor[data-fullpath="${tab_opend_path}"]`];
    if(z == undefined){
        console.log("first")
        i = require("ace/autocomplete/popup").AcePopup
        z = i(a)
        popups[`.editor[data-fullpath="${tab_opend_path}"]`] = z;
    }
    results  = word_list;
    var renderer = txt_editor.renderer;
    var lineHeight = renderer.layerConfig.lineHeight;
    var pos = renderer.$cursorLayer.getPixelPosition(this.base, true);
    pos.left -= z.getTextLeftOffset();
    var rect = txt_editor.container.getBoundingClientRect();
    pos.top += rect.top - renderer.layerConfig.offset;
    pos.left += rect.left - txt_editor.renderer.scrollLeft;
    pos.left += renderer.gutterWidth;
    
    
    z.setData(results,"");
    if(!z.isOpen){
        z.show(pos, lineHeight);
        z.focus()
        console.log("focused")
        a.onkeydown =(e)=>{console.log(e.key)}
        window.api.create_local_shk("Down");
        window.api.on("Down", ()=>{
            z.goTo("down");
            // if((row=z.getRow())<results.length){
            //     z.setRow(row+1);
            // }
            
        });
        
        window.api.create_local_shk("End");
        window.api.on("End", ()=>{
            z.goTo("end");
            // if((row=z.getRow())>0){
            //     z.setRow(row-1);
            // }
            
        });
        
        window.api.create_local_shk("Up");
        window.api.on("Up", ()=>{
            z.goTo("up");
            // if((row=z.getRow())>0){
            //     z.setRow(row-1);
            // }
            
        });
        
        window.api.create_local_shk("Start");
        window.api.on("Start", ()=>{
            z.goTo("start");
            // if((row=z.getRow())>0){
            //     z.setRow(row-1);
            // }
            
        });
        
        window.api.create_local_shk("Alt+Enter");
    }
    window.api.off("Alt+Enter");
    window.api.on("Alt+Enter", ()=>{
        console.log(old_prefix)
        len = old_prefix.length
        curpos = txt_editor.getCursorPosition();
        console.log(curpos);
        const range = new ace.Range(
            curpos.row,
            curpos.column-len,
            curpos.row,
            curpos.column
        );
        const value = txt_editor.session.getValue();
        index = indexToPosition(value, curpos)
        // console.log( z.getData(z.getRow()))
        const data = z.getData(z.getRow());
        txt_editor.session.replace(range, data.substring(0,data.lastIndexOf("\t") ))
        // console.log(txt_editor.session.getValue())
        // console.log(index)
        // // curpos = txt_editor.getCursorPosition();
        // txt_editor.startOperation({command: {name: "insertMatch"}});
        // replaced  = value.substring(0, index-len) 
        // txt_editor.session.doc.setValue(replaced);
        // txt_editor.execCommand("insertstring", z.getData(z.getRow())+value.substring(index));
        // txt_editor.endOperation();
        // +  z.getData(z.getRow()) + 
        // txt_editor.session.doc.(value.substring(index));
        // const range2 = new ace.Range(
        //     curpos.row,
        //     curpos.column-1,
        //     curpos.row,
        //     curpos.column
        // )
        // txt_editor.session.remove(range2)
        // txt_editor.execCommand("insertstring", z.getData(z.getRow()));
        z.removeLines()
        z.hide()
        window.api.delete_local_shk("Alt+Enter");
        window.api.delete_local_shk("Up");
        window.api.delete_local_shk("Down");
        window.api.off("Alt+Enter");
        window.api.off("Up");
        window.api.off("Down");
    });
    
    return z;
    // txt_editor.execCommand("insertstring", "rest");  
}


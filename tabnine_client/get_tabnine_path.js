function parse_semver(v1,v2){
    v1ary = [];
    v2ary = [];
    // try{
        for(const  x of v1.split('.')){
            v1ary.push(Number(x));
        }
        for(const  x of v2.split('.')){
            v2ary.push(Number(x));
        }
        console.log(v1ary)
        console.log(v2ary)
        for(let i=0,len=Math.min(v1ary.length,v2ary.length);i<len;i++){
            if(v1ary[i] !== v2ary[i]){
                return v2ary[i] - v1ary[i];
            }
        }
        return ary
    // }
    // catch{
    //     return [];
    // }
};


function get_tabnine_path(binary_dir){
    const fs = require("fs");
    const path = require("path");
    function join_path(...args){
        return path.join(binary_dir, ...args);
    }

    translation = {
        "linux:x32": "i686-unknown-linux-musl/TabNine",
        "linux:x64": "x86_64-unknown-linux-musl/TabNine",
        "osx:x64": "x86_64-apple-darwin/TabNine",
        "osx:arm64": "aarch64-apple-darwin/TabNine",
        "windows:x32": "i686-pc-windows-gnu/TabNine.exe",
        "windows:x64": "x86_64-pc-windows-gnu/TabNine.exe",
    }

    platform_key = "windows:x64"
    platform = translation[platform_key]

    versions = []

    //  if a .active file exists and points to an existing binary than use it
    active_path = join_path(binary_dir, ".active")
    // print(active_path)
    if(fs.existsSync(active_path)){
        version = fs.readFileSync(active_path, "utf-8").trim()
        version_path = join_path(binary_dir, version)
        active_tabnine_path = join_path(version_path, platform)
        if(fs.existsSync(active_tabnine_path)){
            versions = [version_path]
            }
        }

    if (versions.length == 0){
        versions = fs.readdirSync(binary_dir)
        console.log(versions)
        versions.sort(key=parse_semver)
        console.log(versions)
    }
    i = ["1.1","1.2"]
    console.log(parse_semver(i[0],i[1]))
    i.sort(parse_semver)
    console.log(i);
    for (const version of versions){
        console.log(version)
        console.log(platform);
        paths = join_path(version, platform)
        var stats = fs.statSync(paths);
        console.log(paths)
        console.log(stats)
        if (stats.isFile()) {
            // console.log('This is a directory');
            console.log("Tabnine: starting version", version);
            return paths;
        }

    }
}
exports["get_tabnine_path"] = get_tabnine_path;
// console.log(get_tabnine_path("C:/Users/taiki/Desktop/program/portfolio/150819_electron_text_editor/test/TabNine/binaries").replaceAll("\\","/"))

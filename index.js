const fs = require('fs');
const sharp = require('sharp');

const input_folder = "./input/"
const output_folder = "./output/";

let gbx_files = fs.readdirSync(input_folder);

gbx_files.forEach(gbx_file => {

    let data = fs.readFileSync(input_folder + gbx_file); 
    let file_size = data.length;

    let start = data.indexOf(Buffer.from([0x52, 0x49, 0x46, 0x46]), 0);
    if (start === -1) {
        console.log("The file does not contain RIFF")
        return;
    }

    let size = data.readUInt32LE(start + 4);
    let end = start + 12 + size;
    let webmImage = data.slice(start, end);

    let output_path = output_folder + gbx_file.replace(".Gbx", ".webp");

    sharp(webmImage).flip().toFile(output_path, (err, info) => {
        if(err) throw err;
        console.log(gbx_file + " done!");
    })
})




const fs = require('fs');
const client = require('https');


const cookie = '_ym_uid=1636298200196691360; mos_id=Cg8qAWGKPwxfVgzqVQFVAgA=; uxs_uid=707f4570-419e-11ec-8a45-57b020627359; _ga=GA1.2.1560388202.1638914027; __ddg1_=ahXhWIJ2J0rCtu8KbhVc; _gcl_au=1.1.1381562732.1666083568; _ym_d=1670100182; _ym_isad=2; request_uri=L2F1dG9jbG9zZS5odG1s; OAuth_Token_Request_State=3810da9d-4ace-4224-904d-8da2e96e55f1; kc-access=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; kc-state=g4naWY5ujf2yj+Wuh8cqt6E7Q++92qWJvxzbV7T0KfOiNtwFwl+cKVnKwG7l8lT87/2jIPTVrWpZVxKjrDewz/Ivw76qvi3SF445aD+cNkpA1Q7ZC8dXh9v/K1lnxaO5WWg113oQB52LxqTiKJNCiRiI624b7kj9/OiJQKkwIGYGgXDM434KIlSSW37kgvqO1VcXJXw3hRei9hhjoE6CXLqmBJLUWrUw8LDZJP1X/Xl+fQEV28910shdS3RLdw1ifqI4vp5K5qRWUElW80uE7JjcDz3BLH8VakCJ229c41BPpgqo33nxZpwOuRjNdM4r+u0CqtjNhQ8821CuVrlRV+nsuXI/L6H/dtjl0pcDSi4KTYQrTx7lw/Cx+NmrIF2Pjkj9PZlHzB2Dhgu7jtKY0CGpwTAXBGOQhs2yUzWkXInG30XzJbXqxHW3Sj+bY8ymNezhDVACAUu5ZK4k0V/0oJp4//wHOEtqekG/FyUOwR+3MtSY/9Qbde/7iW/MvDdurgnR1Az3RRuzs8/EKpwDBxz7QFe/+22lebcPKOHyMa3liMzm4x3sCneHkpQ4p8xOw6/s4Qpx/qpFhVvcznsWpcuvBsZScoK2QRYWfXGpXL44qKhXU/TjEGcRYWQPlebnq/XrRLp2KXgKkfI41RsKrOMn+eKIOUoSp+U6yjSSamPYCTznhMu44XbtPqJ2WnjmYwmBeTEOY3J8bOvwspJrirnu3x1l0qhPcsNES5iOHvmsY8uaxByyctcvLt2OxkRNGN0gLdWrvpWxwFAqylaT5wvxqNppDSSjyGNfNseB0QT/hH2bL6j4/lpBthf7yb5jKrvZjRF/g3MjHF3QJ33g4YPLaYeIXw';

/*
const options = {
  hostname: 'smart.mos.ru',
  path: '/app/map3d/terrain/tilesets/test/12/4948/3316.terrain',
  origin: 'https://smart.mos.ru',
  referer: 'https://smart.mos.ru',
  cookie: cookie,
  method: 'GET',
  headers: {
    'Content-Type': 'application/octet-stream',
    'origin': 'https://smart.mos.ru',
    'referer': 'https://smart.mos.ru',
    'cookie': cookie,
	},
};
*/
/*

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        //client.get(url, (res) => {
        client.get(options, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
}

downloadImage(pageUrl, 'page1.json')
    .then(console.log)
    .catch(console.error);

    */

var z5 = [5,   38,  38,  25,  26];
var z6 = [6,   77,  77,  51,  52];
var z7 =[7,   154, 155, 102, 105];
var z8 =[8,  308, 310, 205, 209];
var z9 =[9,   617, 620, 413, 417];
var z10 =[10,  1233,    1242,    823, 834];//823 834
var z11=[11,  2464,    2484,    1646,    1669];//1646 1669
var z12=[12,  4927,    4930,    3295,    3296];//12,  4927,    4969,    3295,    3295

var z = 9;

var xMin = 617;
var xMax = 620;

var yMin = 413;
var yMax = 417;


function downloadZoom(z, xMin,xMax,yMin,yMax){
    var dirZ = './'+z;
        if (!fs.existsSync(dirZ)){
            fs.mkdirSync(dirZ);
        }

    for (var x=xMin;x<=xMax;x++){
        var dir = './'+z+'/'+x;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        for (var y=yMin;y<=yMax;y++){
            var basePath = '/app/map3d/terrain/tilesets/test/';
            var dir = z+'/'+x+'/'+y+'.terrain';
            var path = basePath+dir;
            //console.log(path)
            var options = {
                dir: dir,
                hostname: 'smart.mos.ru',
                path: path,
                origin: 'https://smart.mos.ru',
                referer: 'https://smart.mos.ru',
                cookie: cookie,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'origin': 'https://smart.mos.ru',
                    'referer': 'https://smart.mos.ru',
                    'cookie': cookie,
                },
            };
            downloadTile(options)

            //
        }

    }
}

function downloadTile(opts){
    client.get(opts, resp => {
                
                var savePath = "./"+opts.dir;
                console.log(resp.statusCode, savePath)
                resp.pipe(fs.createWriteStream(savePath))
            });

}

///////////////////////////////
//downloadZoom(z, xMin,xMax,yMin,yMax)

downloadZoom(z12[0],z12[1],z12[2],z12[3],z12[4])
/*
var dir = './temp';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

client.get(options, resp => resp.pipe(fs.createWriteStream('./temp/test.json')));
*/
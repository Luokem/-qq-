const path = require('path');
const fs = require('fs');


var ErrorObject = [];

class ReExtension {
    constructor () {}
    // 替换文件后缀
    replace (dir, oldExtension, newExtension) {
        fs.readdir(dir, (err, files) => {
            if (err) throw err
            files.forEach((item, index) => {

                let filePath = path.join(dir, item)
                fs.stat(filePath, (err, stat) => {
                    if (err) throw err
                    if (stat.isDirectory()) {
                        //如果是目录，递归遍历
                        this.replace(filePath, oldExtension, newExtension)
                    } else {
                        //是文件
                        let re = new RegExp(oldExtension)
                        if (re.test(filePath)) {
                            const newFilePath = filePath.replace(re, function(match,p) {
                                return newExtension;
                            })
                            fs.rename(filePath, newFilePath, (err) => {
                                // if (err) throw err
                                ErrorObject.push(err);
                                if(newExtension == '.qml') {
                                    this.replaceTwo(dir,newFilePath)
                                }
                            })
                        }
                    }
                });
            });
        });
    }
    // .qml将wx:替换成 qq:
    replaceTwo (dir, filepath) {
        return new Promise((resolve, reject) => {
             fs.readFile(filepath,'utf8', (err,data)=> {
                if(err) {throw  err;reject({err:'1',tip: '.qml读取文件错误'+filePath})};
                var data = data.replace(/wx:/g,'qq:');
                    data = data.replace(/<wxs /g,'<qs ');
                // console.log("data",data)
                fs.writeFile(filepath,data,(err)=> {
                    if(err) {
                        throw err
                        reject({err:'1',tip: '.qml写入文件失败'})
                    }else {
                        resolve({err: '0',tip: '.qml写入文件成功'})
                    }
                        
                }) 
               
            })   
        });

    }

    // .js文件： wx.替换成qq.
    replaceThree (dir,extension) {
      fs.readdir(dir, (err, files) => {
        if (err) throw err
        files.forEach((item, index) => {

            let filePath = path.join(dir, item)
            fs.stat(filePath, (err, stat) => {
                if (err) throw err
                if (stat.isDirectory()) {
                    //如果是目录，递归遍历
                    this.replaceThree(filePath, extension)
                } else {
                    //是文件
                    let re = new RegExp(extension);

                    if (re.test(filePath)) {
                        fs.rename(filePath, filePath, (err) => {
                            // if (err) throw err
                            ErrorObject.push(err);
                            fs.readFile(filePath,'utf8', (err,data)=> {
                                if(err) {throw  err;};
                                var data = data.replace(/wx\./g,'qq.');
                                fs.writeFile(filePath,data,(err)=> {
                                    if(err) {
                                        throw err
                                    }
                                        
                                }) 
                               
                            })
                        }); 
                    }
                }
            });
        });
    });  

    }

    // app.json: 删除好物圈推荐
    operateFile (dataURL) {
    return new Promise((resolve, reject) => {
             
        fs.readFile(dataURL,'utf8', (err,data)=> {
            if(err) {throw  err;reject({err:'1',tip: 'app.json读取文件错误'})}
            var   datas = JSON.parse(data);

            // 如果好物推荐插件存在,删除内容
            if(datas.plugins) {
                delete datas.plugins
                let str = JSON.stringify(datas)
                // console.log("datas",str)

                fs.writeFile(dataURL,str,(err)=> {
                    if(err) {
                        throw err
                        reject({err:'1',tip: 'app.json写入文件失败'})
                    }else {
                        resolve({err: '0',tip: 'app.json写入文件成功'})
                    }
                        
                })
            };   
           
        });
    });
  }
}

module.exports = ReExtension
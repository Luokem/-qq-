const reExtension = require('./util/changeFilepostfix');

var  findObect = {
    dir: 'D:/department.IT/5.SmartRetail/7.MiniProgram/7.4.qq/2.Code/1.Mall/',//qq小程序所在app.json目录
    oldExtension: ['\\.wxml+?','\\.wxss+?','\\.wxs+?'],//需要替换文件后缀正则
    newExtension: ['.qml','.qss','.qs'],//替换后文件后缀

    fileUrlOne: ['app.json']
};


/*
*wxml文件 
* @后缀.wxml, .wxss,.wxs 替换成.qml,.qss,.qs
* @ <wxs 改<qs
* @ .wxml里面wx: 替换成qq:
*/ 

findObect.oldExtension.forEach((item,index)=> {
    new reExtension().replace(findObect.dir, item, findObect.newExtension[index])
});



/*
* js文件
* @ wx. 替换qq.
*/

new reExtension().replaceThree(findObect.dir, '.js$');




/*
*app.json: 删除好物圈推荐
*/ 
new reExtension().operateFile(findObect.dir + findObect.fileUrlOne[0]);





const url = require('url');
const path = require('path');
const fs = require('fs');

//file imports
const buildBreadcrumb = require('./breadcrumb.js');




//static base bath: location of your static folder
const staticBasePath = path.join(__dirname, '..', 'static');
const respond = (request, response) => {
   
    
    
    
    
    
 let pathname = url.parse(request.url, true).pathname;
    if(pathname === '/favicon.ico'){
      return false;
         }
    console.log(pathname);
    pathname = decodeURIComponent(pathname);
    
    const fullStaticPath = path.join(staticBasePath, pathname);
    
    if(!fs.existsSync(fullStaticPath)){
        console.log(`${fullStaticPath} does not exist`);
        response.write('404: File not found');
        response.end();
        return false;
    }
    
    let stats;
    //we found something
    try{
       stats = fs.lstatSync(fullStaticPath);
    }
    catch(err)
        {
         console.log(`lstatSync Error: ${err}`);
         }
    
    //it is directory
    if(stats.isDirectory){
  //get content
        let data = fs.readFileSync(path.join(staticBasePath,'project_files/index.html'), 'utf-8');
        
        console.log(pathname);
        let pathElements = pathname.split('/').reverse();
        console.log(pathElements);
        pathElements = pathElements.filter(element => element !== '');
        const folderName = pathElements[0];
        console.log(folderName);
        data = data.replace('page_title', folderName);
        
        //build breadcrumb
        const breadcrumb = buildBreadcrumb(pathname);
         data = data.replace('pathname', breadcrumb);
        
        
        
        
        
        
        
        
        response.statusCode = 200;
        response.write(data);
        response.end();
}
  
    
    
    
    
    
    
    
    
    
    
}



























module.exports = respond;
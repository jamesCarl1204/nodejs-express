const fsPromises = require('fs').promises
const path = require('path')

const fileOps = async () => { 
        try {
           
            await fsPromises.writeFile(path.join(__dirname, 'input.txt'), 'hi' );
            await fsPromises.appendFile(path.join(__dirname, 'input.txt'), '\nyay');
            const newData = await fsPromises.readFile(path.join(__dirname, 'input.txt'), 'utf8')
            console.log(newData)
        } catch(err) { 
            console.error(err)
        }
}


fileOps()


// fs.readFile(path.join(__dirname, 'input.txt'),'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data)
// })

// fs.writeFile(path.join(__dirname, 'myfile.txt'), 'this is my file', (err, data) => {
//     if(err) throw err;
//     console.log('write complete')

//     fs.appendFile(path.join(__dirname, ), 'myfile.txt'), '\nyeah its yours', (err) =>  {
//     if(err) throw err;
//     console.log('append file')
// }
// })


const fs  = require('fs')
const yml = require('js-yaml')
const request = require('request-promise')

const getContributorsList = async (url) => {
    return await request.get({
        headers: { 'User-Agent': 'Request-Promise' },
        json: true,
        uri: url,
    })
}

const saveContributors = async (outFilePath) => {

    let dataStatusReact = await getContributorsList('https://api.github.com/repos/status-im/status-react/contributors?per_page=30')
    let dataStatusGo = await getContributorsList('https://api.github.com/repos/status-im/status-go/contributors?per_page=30')
    
    let result = dataStatusReact.concat(dataStatusGo);
    
    var content = fs.readFileSync('source/_data/employees.yml', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
    });

    yamlText = yml.safeDump({ result }, {lineWidth: 200})
    let fileContents = (
      "# Managed via 'contributors' gulp task\n" + yamlText
    )
    fs.writeFileSync(outFilePath, fileContents)
    console.log('Generate contributors.yaml');
}

if(1 == 2){
    saveContributors('source/_data/contributors.yml')
}
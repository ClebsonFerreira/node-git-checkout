const axios = require('axios').default;
const { exec, spawn } = require('child_process');

class Git {

    constructor() {
        this._urlBase = 'https://api.github.com/repos';
    }

    async getRepo(name) {
        let url = `${this._urlBase}/${name}`;
        return await axios.get(url).then((response) => {
            return response;
        });
    }

    getInfo(repo) {
        console.log("#======================#");
        console.log(`|Nome:  ${repo.name}`);
        console.log(`|Mantido por :  ${repo.owner.login}`);
        console.log(`|Full Name:  ${repo.full_name}`);
        console.log(`|Description:  ${repo.description}`);
        console.log(`|stars:  ${repo.stargazers_count}`);
        console.log(`|Forks:  ${repo.forks_count}`);
        console.log(`|Issues: ${repo.open_issues}`);
        console.log(`|Url para Clone: ${repo.clone_url}`);
        console.log(`|Linguagem: ${repo.language}`);
        console.log("#======================#");
    }

    gitClone(repo) {
        let array = __dirname.split('\\');
        array.pop();
        const url = array.join('\\');
        const dir = spawn('git', ['clone', repo.clone_url]);
        dir.on('close', code => {
            const cp = exec(`cp -r ${repo.name} ${url}`);
            cp.on('close', code => {
                const rm = exec(`rm -rf ${repo.name}`);
                rm.on('close', code => console.log(`processo terminado ${code}`));
            });
        });
    }
}

module.exports = Git;
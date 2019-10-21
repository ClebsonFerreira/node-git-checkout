const git = require('./git');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
/**
 * start app 
 */
const init = () => {
    const repo = new git();
    rl.question("Digite um nome de repositorio ?\n", (nameRepo) => {
        repo.getRepo(nameRepo).then((repoDetail) => {
            if (repoDetail) {
                info(repo, repoDetail);
            }
        }).catch((error) => {
            console.log("repositorio não econtrado");
            rl.close();
        });
    });
}

const info = (repo, repoDetail) => {
    rl.question("saber info repo Y/N ?\n", (option) => {
        if (option === 'Y' || option === 'y') {
            repo.getInfo(repoDetail.data);
            infoClone(repo,repoDetail);
        } else {
            infoClone(repo,repoDetail);
        }
    });
};

const infoClone = (repo, repoDetail) => {
    rl.question("Deseja clonar este repo Y/N ?\n", (option) => {
        if (option === 'Y' || option === 'y') {
            repo.gitClone(repoDetail.data);
            rl.close();
        } else {
            rl.close();
        }
    });
};

//start app 
init();




let service = require('../services');

const mainProject = (res) => {
    service.projectService.mainProject(res);
}
const chessProject = (res) => {
    service.projectService.chessProject(res);
}
const weatherApp = (res) => {
    service.projectService.weatherApp(res);
}

module.exports = {
    mainProject, chessProject, weatherApp
}
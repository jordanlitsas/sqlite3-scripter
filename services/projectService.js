const mainProject = (res) => {
    res.end(`This page will present my main project for this unit.`);
}
const chessProject = (res) => {
    res.end(`This page will support a .net terminal so the user can play a text-based chess game.`);
}
const weatherApp = (res) => {
    res.end("Im in the process of finding where I left those files ........");

}

const sqlGenerator = (res) => {
   res.redirect('/dbmsUserEntry.html');

}


module.exports = {
    mainProject, chessProject, weatherApp, sqlGenerator
}
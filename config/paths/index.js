const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    dist: resolveApp("dist"),
    node_modules: resolveApp("node_modules"),
    html: resolveApp("src/template/index.ejs"),
    pages: resolveApp("src"),
    assets: resolveApp("src/assets"),
    mock: resolveApp("src/mock"),
    store: resolveApp("src/store"),
    components: resolveApp('src/components'),
    main: resolveApp('src/index.ts'),
    ts: resolveApp('./tsconfig.json'),
    logo: path.resolve('./logo.png'),
    icon: path.resolve(__dirname, '../../src/assets/images/ball_icon.png'),
    iosDestination: path.join('icons', 'ios'),
    androidDestination: path.join('icons', 'android'),
};
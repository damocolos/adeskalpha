const packageJson = require('../../package.json');

export const environment = {
    appName: 'koperasi',
    envName: '🏃STAGING',
    production: false,
    versions: {
        app: packageJson.version,
        angular: packageJson.dependencies['@angular/core'],
        ngrx: packageJson.dependencies['@ngrx/store'],
        material: packageJson.dependencies['@angular/material'],
        bootstrap: packageJson.dependencies.bootstrap,
        rxjs: packageJson.dependencies.rxjs,
        angularCli: packageJson.devDependencies['@angular/cli'],
        typescript: packageJson.devDependencies['typescript']
    },
    app: {
        endpoint: 'https://apistage.preme.id',
        IMAGE_URL: 'https://apistage.preme.id/images',
        GMAPS_KEY: 'AIzaSyDHvgyQVZgu3vEmwiu_Y9r-b-2r_Q0ACFA',
        SECRET_KEY: 'KiaxHrLho0Ar3aDNLn1xLNTrqtBagLJx',
        LOGIN_PAGE: '/auth/login'
    }
};

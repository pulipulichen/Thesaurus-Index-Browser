let config = {
  appName: 'Thesaurus-Index-Browser',
  debug: {
    ErrorHandler: {
      verbose: true
    },
    enableRestore: true,
  },
  
  inited: false,
  urlGithub: 'https://github.com/pulipulichen/Thesaurus-Index-Browser/',
  urlIssue: 'https://github.com/pulipulichen/Thesaurus-Index-Browser/issues/new',
  
}

import styleConfig from './styles/style.config.js'
config.styleConfig = styleConfig

//import readingConfig from './../config/reading.js'
//config.readingConfig = readingConfig

import productionConfig from './config.production.js'
if (process.env.NODE_ENV === 'production') {
  for (let name in productionConfig) {
    config[name] = productionConfig[name]
  }
}

export default config
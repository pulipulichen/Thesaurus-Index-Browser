let config = {
  appName: 'HTML-Simple-Classifier',
  debug: {
    ErrorHandler: {
      verbose: true
    },
    enableRestore: true,
  },
  
  inited: false,
  loadingProgress: 1,
  urlGithub: 'https://github.com/pulipulichen/HTML-Simple-Classifier/',
  urlIssue: 'https://github.com/pulipulichen/HTML-Simple-Classifier/issues/new',
  openFromAPI: false,
  
  demoDataList: [
    'weather.play.ods',
    'weather.class.csv',
    'iris.ods',
    'labor.csv'
  ],
  isDataProcessing: false,
  modelBuildedTime: null
  //demoData: 'weather.play.ods'
  //demoData: 'labor.csv'
  //demoData: 'unbalanced.csv'
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
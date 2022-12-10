module.exports = function (app) {
  app.watch['config.inited'] = function () {
    if (this.config.inited === false) {
      return false
    }
    this.initPostMessageAPI()

    //this.testRegression()
  }

  app.watch['localConfig.dataIndex'] = function () {
    this.setDefaultGraphTerm()
  }

  app.watch['localConfig.dataThesaurus'] = function () {
    this.setDefaultGraphTerm()
  }

  app.watch['localConfig.termFocus'] = function () {
    this.setupGraphData()
  }

  app.watch['config.inited'] = function () {
    if (this.config.inited === false) {
      return false
    }

    setTimeout(() => {
      this.setupGraphData()
    }, 100)
  }
}
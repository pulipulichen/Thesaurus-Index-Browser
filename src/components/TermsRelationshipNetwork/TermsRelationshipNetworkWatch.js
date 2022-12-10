module.exports = function (app) {
  app.watch['config.inited'] = function () {
    if (this.config.inited === false) {
      return false
    }
    this.initPostMessageAPI()

    //this.testRegression()
  }

  app.watch['localConfig.dataIndex'] = function () {
    this.setDefaultTermFocus()
  }

  app.watch['localConfig.dataThesaurus'] = function () {
    this.setDefaultTermFocus()
  }

  app.watch['localConfig.termFocus'] = function () {
    this.setupGraphData()
  }

  app.watch['config.inited'] = function () {
    if (this.config.inited === false) {
      return false
    }

    setTimeout(() => {
      this.scrollToTermFocus()
      this.setupGraphData()
      
    }, 100)
  }

  app.watch['localConfig.view'] = function () {
    if (this.localConfig.view !== 'browse') {
      return false
    }

    this.scrollToTermFocus()
    this.setupGraphData()
    // setTimeout(() => {
    //   this.initCytoscapeVis()
    // }, 100)
  }
}
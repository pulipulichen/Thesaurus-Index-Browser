module.exports = function (app) {

  app.methods.setDefaultTermFocus = function () {
    if (this.config.inited === false || this.localConfig.view !== 'browse') {
      return false
    }
    if (this.localConfig.termFocus) {
      return false
    }

    // await this.utils.AsyncUtils.sleep(100)

    // console.log(this.$parent.$refs.ListThesaurus.list)
    if (this.$parent.$refs.ListThesaurus.list.length > 0) {
      console.log(1)
      this.localConfig.termFocus = this.$parent.$refs.ListThesaurus.complexest.term
    }
    else if (this.$parent.$refs.ListIndex.list.length > 0) {
      console.log(2)
      this.localConfig.termFocus = this.$parent.$refs.ListIndex.complexest.term
    }
  }

  app.methods.scrollToTermFocus = function () {
    // console.log(this.config.inited, this.localConfig.view)
    if (this.config.inited === false || this.localConfig.view !== 'browse') {
      return false
    }
    // console.log('go')
    this.$parent.$refs.ListIndex.scrollToTermFocus()
    this.$parent.$refs.ListThesaurus.scrollToTermFocus()
  }

  let locatorSizeLimit = 8
  app.methods.displayLocator = function (loc) {
    if (loc.length < locatorSizeLimit) {
      return loc
    }

    let half = Math.ceil(locatorSizeLimit / 2) - 1
    return loc.slice(0, half) + '...' + loc.slice(half * -1)
  }
}
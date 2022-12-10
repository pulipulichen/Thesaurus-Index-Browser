module.exports = function (app) {

  app.methods.setDefaultGraphTerm = function () {
    if (this.localConfig.graphTerm) {
      return false
    }

    // await this.utils.AsyncUtils.sleep(100)

    if (this.$parent.$refs.ListThesaurus.list.length > 0) {
      this.localConfig.graphTerm = this.$parent.$refs.ListThesaurus.list[0].term
    }
    else if (this.$parent.$refs.ListIndex.list.length > 0) {
      this.localConfig.graphTerm = this.$parent.$refs.ListIndex.list[0].term
    }
  }

  app.methods.scrollToTermFocus = function () {
    console.log('go')
    this.$parent.$refs.ListIndex.scrollToTermFocus()
    this.$parent.$refs.ListThesaurus.scrollToTermFocus()
  }
}
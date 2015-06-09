(function($, imageList) {
  /**
   * The actual element replace.
   */
  function replace(imageElement) {
    var elementWidth = $(imageElement).width(),
      elementHeight = $(imageElement).height(),
      // TODO: AR-sensitive selection.
      replacementImage = _.sample(imageList);

    $(imageElement).error(function() {
      // Remove the broken image from the list.
      imageList = _.without(imageList, replacementImage);
      // Try again.
      _.delay(
        _.bind(replaceWithRandom, this, imageElement),
        10);
    });

    $(imageElement)
      .attr('src', replacementImage)
      .css('width', elementWidth + 'px')
      .css('height', elementHeight + 'px');
  }

  /**
   * Checks whether an element should be replaced and replaces it, if necessary.
   */
  function replaceImageIfNecessary(imageElement) {
    var existingSrc = $(imageElement).attr('src');

    if (_.contains(imageList, existingSrc)) {
      // Already replaced.
      return;
    }

    var elementWidth = $(imageElement).width(),
      elementHeight = $(imageElement).height(),
      imageLoaded = elementWidth > 0 && elementHeight > 0;

    if (imageLoaded) {
      replace(imageElement);
    } else {
      // Delay until it's ready.
      _.delay(
        _.bind(replaceImageIfNecessary, this, imageElement),
        500);
    }
  }

  /**
   * Processes all img elements on the page.
   */
  function processPage() {
    _.each($('img'), replaceImageIfNecessary);
  }

  processPage();
})(jQuery, _.clone(goshoImages));

import AbstractRenderer from './../base/abstract-renderer';

export default class Text extends AbstractRenderer {

  constructor(model) {
    super(model);
  }

  render() {
    let objectId = helper.getObjectId(o.id);
    var object = undefined;
    if (o.options.drawn) {
      object = d3.select('#' + objectId);
    } else {
      object = canvas.append("text").attr('id', objectId);
    }
    // cannot continue if object is not present
    if (!object) {
      throw new Error('Oops, could not create object with id ' + objectId);
    }
    // add attributes to object
    object.attr("x", o.x).attr("y", o.y).text(o.value).style("fill", o.options.color);
    return object;
  }
}


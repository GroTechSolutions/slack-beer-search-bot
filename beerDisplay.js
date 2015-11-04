var brewerydb = require('./brewerydb');
var slack = require('./slack');

module.exports = function (req, res, next) {
  brewerydb.beer(req.body.text, function(data) {
    if(typeof data === 'string' || data instanceof String) {
      res.status(200).send(data);
    } else {
      var attachments = [slack.createAttachment(data.name, data.id, data.description, data.name, data.labels.medium)];
      slack.displayToChat(req.body.channel_id, attachments);
    }
  });
}


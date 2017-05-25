if (Meteor.isServer) {
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });
  Api.addRoute('status', {
    post: function() {
      return { status: 'OK' };
    },
  });
}

if (Meteor.isServer) {
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });
  Api.addRoute('status', {
    post: function() {
      const public = Meteor.settings.public;
      return { status: 'OK', name: public && public.name ? public.name : 'UnSet' };
    },
  });
}

if (Meteor.isServer) {
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
  });
  Api.addRoute('status', {
    post: function() {
      const public = Meteor.settings.public;
      const data = {
        name: public && public.name ? public.name : Meteor.absoluteUrl(),
        url: Meteor.absoluteUrl(),
      };
      return { status: 'OK', data: data };
    },
  });
}

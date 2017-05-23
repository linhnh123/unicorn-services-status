ServicesStatus = new Mongo.Collection('servicesStatus');
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
        type: 'HEALTH_CHECK',
        lastOnline: new Date(),
      };
      try {
        // Clear collection if have greater than 100 records
        if (ServicesStatus.find({}).count() > 100) {
          ServicesStatus.remove({});
        }
        // Insert new data
        ServicesStatus.insert(data);
        return { status: 'OK', data: data };
      } catch (e) {
        data.message = 'Server is alive, but has an error in api';
        return { status: 'FAILED', data: data };
      }
    },
  });
}

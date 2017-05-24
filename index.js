if (Meteor.isServer) {
  // Check ServicesStatus collection is exiting or not
  try {
    const exist = ServicesStatus.findOne({});
  } catch (e) {
    ServicesStatus = new Mongo.Collection('servicesStatus');
  }
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
        type: 'HEALTH_CHECK',
        lastOnline: new Date(),
      };
      try {
        // Clear collection if have greater than 100 records
        if (ServicesStatus.find({}).count() > 100) {
          ServicesStatus.remove({});
        }
        // Insert new data
        const id = ServicesStatus.insert(data);
        return { status: 'OK', id: id };
      } catch (e) {
        const lastItem = ServicesStatus.findOne({}, {sort: {lastOnline: -1}, fields: {_id: 1}});
        return lastItem ? { status: 'FAILED', id: lastItem._id } : { status: 'FAILED', data: data };
      }
    },
  });
}

module.exports = {


  friendlyName: 'Sort by...',


  description: 'Sort an array of dictionaries by a particular key.',


  sync: true,


  cacheable: true,


  inputs: {

    array: {
      friendlyName: 'Array of dictionaries',
      description: 'The array to sort.',
      example: [{}],
      required: true
    },

    key: {
      friendlyName: 'Sort by...',
      description: 'The shared key to sort by.',
      example: 'createdAt',
      required: true
    }

  },


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      getExample: function(inputs, env) {
        var _ = env._;

        // If the array is not available yet, the best we can do is guarantee
        // that this result will be some sort of homogeneous array of dictionaries.
        if (_.isUndefined(inputs.array)) {
          return [{}];
        }

        // If the array is available and has one item, we can just borrow that first item
        // to build our example.
        if (inputs.array.length > 0) {
          return [inputs.array[0]];
        }

        // Otherwise, the best we can do is send back [{}].
        return [{}];
      }
    }

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    return exits.success(_.sortBy(inputs.array, inputs.key));
  }



};

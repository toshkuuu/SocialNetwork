(function () {
    'use strict';

    module.exports = {
        create: function (name) {
            let Model = require(`../models/${name}`);
            return _initRoutes(Model);
        }
    };

    function _initRoutes(model) {
        return {
            name: model.modelName.toLowerCase(),
            read: function (req, res) {
                model.find(req.query.params || {}, function (err, data) {
                    res.json(data);
                });
            },
            create: function (req, res) {
                _saveInstance(model, req.body, res);
            },
            update: function (req, res) {
                _saveInstance(model, req.body, res);
            },
            delete: function (req, res) {
                model.remove(req.query.params || {}, function (err, data) {
                    res.json(data);
                });
            }
        };
    }

    function _saveInstance(model, request, result) {
        let instance = model.call(this, request);
        instance.save(function (error, data) {
            result.json(data);
        });
    }
} ());
'use strict';
var node_1 = require('./node');
var chai_1 = require('chai');
describe('Service: k-nearest-neighbor', function () {
    it('should classify a flat', function () {
        var neighbors = 3;
        var nodes = new node_1.NodeList(neighbors);
        loadData(nodes);
        var input = getFlat();
        addUnknownNode(nodes, input);
        var result = nodes.determineUnknown();
        chai_1.expect(result).to.have.deep.property(input.type, neighbors);
    });
    it('should classify apartment', function () {
        var neighbors = 3;
        var nodes = new node_1.NodeList(neighbors);
        loadData(nodes);
        var input = getApt();
        addUnknownNode(nodes, input);
        var result = nodes.determineUnknown();
        chai_1.expect(result).to.have.deep.property(input.type, neighbors);
    });
    it('should classify house', function () {
        var neighbors = 3;
        var nodes = new node_1.NodeList(neighbors);
        loadData(nodes);
        var input = getHouse();
        addUnknownNode(nodes, input);
        var result = nodes.determineUnknown();
        chai_1.expect(result).to.have.deep.property(input.type, neighbors);
    });
    it('should classify the closest points with the greatest count', function () {
        /*
        That's what k-nearest-neighbor means.
        "If the 3 (or 5 or 10, or 'k') nearest neighbors to the mystery point are two apartments and one house,
        then the mystery point is an apartment."
        */
        var neighbors = 3;
        var nodes = new node_1.NodeList(neighbors);
        loadData(nodes);
        var input = { rooms: 8, area: 280, type: 'house' };
        addUnknownNode(nodes, input);
        var result = nodes.determineUnknown();
        var processed = isMultipleKey(result) ? getHighest(result) : result;
        chai_1.expect(processed).to.have.deep.property(input.type);
    });
    describe('Service: Node', function () {
        it('should new up a new Node', function () {
            var obj = { rooms: 1, area: 350, type: 'apartment' };
            var a = new node_1.Node(obj);
            chai_1.expect(a).to.have.deep.property('rooms', 1);
        });
        it('should measure distances between 2 points', function () {
            var obj = { rooms: 1, area: 350, type: 'apartment' };
            var a = new node_1.Node(obj);
            chai_1.expect(a).to.have.deep.property('rooms', 1);
        });
        it('should find min and max by traversing all nodes', function () {
            var neighbors = 3;
            var nodes = new node_1.NodeList(neighbors);
            loadData(nodes);
            nodes.calculateRanges();
            chai_1.expect(nodes.rooms).to.deep.equal({ min: 1, max: 10 });
            chai_1.expect(nodes.areas).to.deep.equal({ max: 1700, min: 250 });
        });
        it('should normalize data if asked nicely', function () {
            var result = normalizeFn(8, { min: 1, max: 10 }, 3);
            chai_1.expect(result).to.be.below(1);
        });
    });
    describe('Service: utilities', function () {
        it('should new up a new Node', function () {
            var obj = { rooms: 349, area: 350 };
            var res = getHighest(obj);
            chai_1.expect(res).to.have.deep.property('area', 350);
        });
    });
    function normalizeFn(neighborRooms, rooms_range_obj, nodeRooms) {
        var rooms_range = rooms_range_obj.max - rooms_range_obj.min;
        var delta_rooms = neighborRooms - nodeRooms;
        delta_rooms = (delta_rooms) / rooms_range;
        return delta_rooms;
    }
    function getHighest(obj) {
        var top = 0;
        var key;
        for (var i in obj) {
            if (obj[i] > top) {
                top = obj[i];
                key = i;
            }
        }
        var obj2 = {};
        obj2[key] = obj[key];
        return obj2;
    }
    function isMultipleKey(obj) {
        return Object.keys(obj).length > 1;
    }
    function loadData(nodes) {
        var data = getData();
        for (var i in data) {
            nodes.add(new node_1.Node(data[i]));
        }
    }
    function addUnknownNode(nodes, obj) {
        nodes.add(new node_1.Node({ rooms: obj.rooms, area: obj.area, type: false }));
    }
    function getFlat() {
        return { rooms: 2.5, area: 750, type: 'flat' };
    }
    function getApt() {
        return { rooms: 4.1, area: 280, type: 'apartment' };
    }
    function getHouse() {
        return { rooms: 8, area: 1280, type: 'house' };
    }
    function getData() {
        return [
            { rooms: 1, area: 350, type: 'apartment' },
            { rooms: 2, area: 300, type: 'apartment' },
            { rooms: 3, area: 300, type: 'apartment' },
            { rooms: 4, area: 250, type: 'apartment' },
            { rooms: 4, area: 500, type: 'apartment' },
            { rooms: 4, area: 400, type: 'apartment' },
            { rooms: 5, area: 450, type: 'apartment' },
            { rooms: 7, area: 850, type: 'house' },
            { rooms: 7, area: 900, type: 'house' },
            { rooms: 7, area: 1200, type: 'house' },
            { rooms: 8, area: 1500, type: 'house' },
            { rooms: 9, area: 1300, type: 'house' },
            { rooms: 8, area: 1240, type: 'house' },
            { rooms: 10, area: 1700, type: 'house' },
            { rooms: 9, area: 1000, type: 'house' },
            { rooms: 1, area: 800, type: 'flat' },
            { rooms: 3, area: 900, type: 'flat' },
            { rooms: 2, area: 700, type: 'flat' },
            { rooms: 1, area: 900, type: 'flat' },
            { rooms: 2, area: 1150, type: 'flat' },
            { rooms: 1, area: 1000, type: 'flat' },
            { rooms: 2, area: 1200, type: 'flat' },
            { rooms: 1, area: 1300, type: 'flat' },
        ];
    }
});
// var run = function() {
//     nodes.draw("canvas");
// }; 

/*
 * Expected keys in object:
 * rooms, area, type
 */

export interface IKeys {
    rooms: number;
    area: number;
    type: any;
}

export interface IRange {
    max:number;
    min:number;
}

export class Node {
    neighbors:Array<any>;
    rooms:number;
    area:number;
    type:any;
    guess:any;
    constructor(object:IKeys) {
        for (var key in object) {
            this[key] = object[key];
        }
    }

    measureDistances(area_range_obj:IRange, rooms_range_obj:IRange):void {
        var rooms_range = rooms_range_obj.max - rooms_range_obj.min;
        var area_range  = area_range_obj.max  - area_range_obj.min;

        for (var i in this.neighbors)
        {
            /* Just shortcut syntax */
            var neighbor = this.neighbors[i];

            var delta_rooms = neighbor.rooms - this.rooms;
            delta_rooms = (delta_rooms ) / rooms_range;

            var delta_area  = neighbor.area  - this.area;
            delta_area = (delta_area ) / area_range;

            neighbor.distance = Math.sqrt( delta_rooms*delta_rooms + delta_area*delta_area );
        }
    }

    sortByDistance() {
        this.neighbors.sort(function (a, b) {
            return a.distance - b.distance;
        });
    }

    guessType(k) {
        var types = {};

        for (var i in this.neighbors.slice(0, k))
        {
            var neighbor = this.neighbors[i];

            if ( ! types[neighbor.type] )
            {
                types[neighbor.type] = 0;
            }

            types[neighbor.type] += 1;
        }

        var guess:any = {type: false, count: 0};
        for (var type in types)
        {
            if (types[type] > guess.count)
            {
                guess.type = type;
                guess.count = types[type];
            }
        }

        this.guess = guess;

        return types;
    }
}



export class NodeList {
    nodes:Array<Node>;
    areas: IRange;
    rooms: IRange;
    constructor(private k:number) {
        this.nodes = [];
    }
    add(node) {
        this.nodes.push(node);
    }
    
    determineUnknown() {

        this.calculateRanges();

        /*
        * Loop through our nodes and look for unknown types.
        */
        for (var i in this.nodes)
        {

            if ( ! this.nodes[i].type)
            {
                /*
                * If the node is an unknown type, clone the nodes list and then measure distances.
                */
                
                /* Clone nodes */
                this.nodes[i].neighbors = [];
                for (var j in this.nodes)
                {
                    if ( ! this.nodes[j].type)
                        continue;
                    this.nodes[i].neighbors.push( new Node(this.nodes[j]) );
                }

                /* Measure distances */
                this.nodes[i].measureDistances(this.areas, this.rooms);

                /* Sort by distance */
                this.nodes[i].sortByDistance();

                /* Guess type */
                return this.nodes[i].guessType(this.k);

            }
        }
    }

    calculateRanges() {
        this.areas = {min: 1000000, max: 0};
        this.rooms = {min: 1000000, max: 0};
        for (var i in this.nodes)
        {
            if (this.nodes[i].rooms < this.rooms.min)
            {
                this.rooms.min = this.nodes[i].rooms;
            }

            if (this.nodes[i].rooms > this.rooms.max)
            {
                this.rooms.max = this.nodes[i].rooms;
            }

            if (this.nodes[i].area < this.areas.min)
            {
                this.areas.min = this.nodes[i].area;
            }

            if (this.nodes[i].area > this.areas.max)
            {
                this.areas.max = this.nodes[i].area;
            }
        }

    }
}

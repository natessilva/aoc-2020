import { readFileSync } from 'fs';
import * as _ from 'lodash';

const text = readFileSync('./day13.txt');
const lines = text.toString().trim().split('\n');
const timestamp = +lines[0];
const buses = lines[1].split(',').filter(char => char != 'x').map(char => +char).map(bus => ({ bus, time: timestamp + bus - (timestamp % bus) }))
const min = _.minBy(buses, bus => bus.time)!;
console.log((min.time - timestamp) * min.bus)
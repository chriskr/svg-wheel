"use strict";
const createSVGElement = (name, attrs = {}) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
    return element;
};
const range = function* (start, end, step) {
    if (end === undefined) {
        [start, end, step] = [0, start, 1];
    }
    else if (step === undefined) {
        [start, end, step] = [start, end, 1];
    }
    const isGrowing = end > start;
    if ((isGrowing && start + step < start) ||
        (!isGrowing && start + step > start)) {
        return [];
    }
    while (isGrowing ? start < end : start > end) {
        yield start;
        start += step;
    }
};
const WIDTH = 1000;
const HEIGHT = 1000;
const CIRCLE_RADIUS = 300;
const ICON_RADIUS = 12;
// In percentage of CIRCLE_RADIUS
const CONTROL_POINT = 0.1;
const LABEL_OFFSET = 25;
const ICON_CONFIG = {
    cx: 0,
    cy: 0,
    r: ICON_RADIUS,
    'stroke-width': 1,
    stroke: 'black',
    fill: 'hsl(210, 100%, 70%)',
};
const ICON_LABEL_CONFIG = {
    'font-size': 16,
    y: '0',
    dy: '5',
};
const PATH_CONFIG = {
    'stroke-width': 1,
    stroke: 'hsla(0, 0%, 0%, .7)',
    fill: 'none',
};
const getPoint = (index, count, radius) => [
    Math.cos((index / count) * 2 * Math.PI) * radius,
    Math.sin((index / count) * 2 * Math.PI) * radius,
];
const toPair = (point) => point.map((n) => n.toFixed(1)).join(', ');
const createPath = (startIndex, endIndex, count) => {
    const startPoint = getPoint(startIndex, count, CIRCLE_RADIUS - ICON_RADIUS);
    const startControlPoint = getPoint(startIndex, count, CIRCLE_RADIUS * CONTROL_POINT);
    const endControlPoint = getPoint(endIndex, count, CIRCLE_RADIUS * CONTROL_POINT);
    const endPoint = getPoint(endIndex, count, CIRCLE_RADIUS - ICON_RADIUS);
    return createSVGElement('path', {
        ...PATH_CONFIG,
        d: `M ${toPair(startPoint)} C ${toPair(startControlPoint)} ${toPair(endControlPoint)} ${toPair(endPoint)}`,
    });
};
const createIcon = (index, count, label) => {
    const deg = ((index / count) * 360) % 360;
    const circle = createSVGElement('circle', {
        ...ICON_CONFIG,
    });
    const isRotateLabel = deg > 90 && deg < 270;
    const text = createSVGElement('text', {
        ...ICON_LABEL_CONFIG,
        'text-anchor': isRotateLabel ? 'end' : 'start',
        x: (isRotateLabel ? -1 : 1) * LABEL_OFFSET,
        ...(isRotateLabel ? { transform: 'rotate(180)' } : {}),
    });
    text.textContent = label;
    const g = createSVGElement('g', {
        transform: `rotate(${deg}) translate(${CIRCLE_RADIUS}, 0)`,
    });
    g.appendChild(circle);
    g.appendChild(text);
    return g;
};
const createView = () => {
    const svg = createSVGElement('svg', { viewBox: `0 0 ${WIDTH} ${HEIGHT}` });
    const rect = createSVGElement('rect', {
        x: '0',
        y: '0',
        width: `${WIDTH}`,
        height: `${HEIGHT}`,
        fill: 'hsla(210, 100%, 70%, .25)',
    });
    svg.appendChild(rect);
    const canvas = createSVGElement('g', {
        transform: `translate(${WIDTH / 2}, ${HEIGHT / 2})`,
    });
    const circle = createSVGElement('circle', {
        cx: '0',
        cy: '0',
        r: CIRCLE_RADIUS,
        'stroke-width': '1',
        stroke: 'black',
        fill: 'hsla(210, 100%, 70%, .25)',
    });
    canvas.appendChild(circle);
    const count = 51;
    for (const i of range(count)) {
        const icon = createIcon(i, count, `${getRandomName()} ${getRandomName()}`);
        canvas.appendChild(icon);
    }
    for (const i of range(3, count, 3)) {
        const path = createPath(0, i, count);
        canvas.appendChild(path);
    }
    svg.appendChild(canvas);
    document.body.appendChild(svg);
    showBBox(canvas);
};
const showBBox = (canvas) => {
    {
        const { x, y, width, height } = canvas.getBBox();
        const rect = createSVGElement('rect', {
            x,
            y,
            width,
            height,
            fill: 'none',
            'stroke-width': 1,
            stroke: 'black',
            'stroke-dasharray': '1 4',
        });
        canvas.appendChild(rect);
    }
};
window.onload = createView;
const getRandomName = () => names[(Math.random() * names.length) | 0];
const names = [
    'Aaliyah',
    'Aaron',
    'Abigail',
    'Addison',
    'Adeline',
    'Adrian',
    'Aiden',
    'Alexander',
    'Alice',
    'Allison',
    'Amelia',
    'Andrew',
    'Angel',
    'Anna',
    'Anthony',
    'Aria',
    'Ariana',
    'Asher',
    'Athena',
    'Aubrey',
    'Audrey',
    'Aurora',
    'Austin',
    'Autumn',
    'Ava',
    'Avery',
    'Axel',
    'Beau',
    'Bella',
    'Benjamin',
    'Bennett',
    'Brooklyn',
    'Brooks',
    'Caleb',
    'Cameron',
    'Camila',
    'Caroline',
    'Carson',
    'Carter',
    'Charles',
    'Charlotte',
    'Chloe',
    'Christian',
    'Christopher',
    'Claire',
    'Colton',
    'Connor',
    'Cooper',
    'Cora',
    'Daniel',
    'David',
    'Delilah',
    'Dominic',
    'Dylan',
    'Easton',
    'Eleanor',
    'Elena',
    'Eli',
    'Eliana',
    'Elias',
    'Elijah',
    'Elizabeth',
    'Ella',
    'Ellie',
    'Emery',
    'Emilia',
    'Emily',
    'Emma',
    'Ethan',
    'Eva',
    'Evelyn',
    'Everett',
    'Everleigh',
    'Everly',
    'Ezekiel',
    'Ezra',
    'Gabriel',
    'Gabriella',
    'Genesis',
    'Gianna',
    'Grace',
    'Grayson',
    'Greyson',
    'Hailey',
    'Hannah',
    'Harper',
    'Hazel',
    'Henry',
    'Hudson',
    'Hunter',
    'Ian',
    'Isaac',
    'Isabella',
    'Isaiah',
    'Isla',
    'Ivy',
    'Jack',
    'Jackson',
    'Jacob',
    'Jade',
    'James',
    'Jameson',
    'Jaxon',
    'Jayden',
    'Jeremiah',
    'John',
    'Jonathan',
    'Jordan',
    'Jose',
    'Joseph',
    'Josephine',
    'Joshua',
    'Josiah',
    'Julian',
    'Kai',
    'Kennedy',
    'Kinsley',
    'Landon',
    'Layla',
    'Leah',
    'Leilani',
    'Leo',
    'Leonardo',
    'Levi',
    'Liam',
    'Lillian',
    'Lily',
    'Lincoln',
    'Logan',
    'Luca',
    'Lucas',
    'Lucy',
    'Luke',
    'Luna',
    'Lydia',
    'Madeline',
    'Madelyn',
    'Madison',
    'Mason',
    'Mateo',
    'Matthew',
    'Maverick',
    'Maya',
    'Mia',
    'Michael',
    'Mila',
    'Miles',
    'Naomi',
    'Natalia',
    'Natalie',
    'Nathan',
    'Nevaeh',
    'Nicholas',
    'Noah',
    'Nolan',
    'Nora',
    'Nova',
    'Oliver',
    'Olivia',
    'Owen',
    'Paisley',
    'Parker',
    'Penelope',
    'Peyton',
    'Piper',
    'Quinn',
    'Riley',
    'Robert',
    'Roman',
    'Ruby',
    'Ryan',
    'Rylee',
    'Sadie',
    'Samuel',
    'Santiago',
    'Sarah',
    'Savannah',
    'Scarlett',
    'Sebastian',
    'Serenity',
    'Silas',
    'Skylar',
    'Sofia',
    'Sophia',
    'Sophie',
    'Stella',
    'Theodore',
    'Thomas',
    'Valentina',
    'Victoria',
    'Violet',
    'Waylon',
    'Wesley',
    'Weston',
    'William',
    'Willow',
    'Wyatt',
    'Xavier',
    'Zoe',
    'Zoey',
];

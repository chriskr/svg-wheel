const createSVGElement = (
  name: string,
  attrs: Record<string, string | number> = {}
) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attrs).forEach(([key, value]) =>
    element.setAttribute(key, String(value))
  );
  return element;
};

const range = function* (start: number, end?: number, step?: number) {
  if (end === undefined) {
    [start, end, step] = [0, start, 1];
  } else if (step === undefined) {
    [start, end, step] = [start, end, 1];
  }

  while (start < end!) {
    yield start;
    start += step;
  }
};

const WIDTH = 1000;
const HEIGHT = 1000;
const CIRCLE_RADIUS = 400;
const ICON_RADIUS = 10;
// In percentage of CIRCLE_RADIUS
const CONTROL_POINT = 0.1;

const ICON_CONFIG = {
  cx: 0,
  cy: 0,
  r: ICON_RADIUS,
  'stroke-width': 1,
  stroke: 'black',
  fill: 'hsla(210, 100%, 70%, .5)',
};

const ICON_LABEL_CONFIG = {
  'font-size': 20,
  x: '20',
  y: '0',
  dy: '5',
};

const PATH_CONFIG = {
  'stroke-width': 1,
  stroke: 'hsla(0, 0%, 0%, .3)',
  fill: 'none',
};

const getPoint = (
  index: number,
  count: number,
  radius: number
): [number, number] => [
  Math.cos((index / count) * 2 * Math.PI) * radius,
  Math.sin((index / count) * 2 * Math.PI) * radius,
];

const toPair = (point: [number, number]) =>
  point.map((n) => n.toFixed(2)).join(', ');

const createPath = (startIndex: number, endIndex: number, count: number) => {
  const startPoint = getPoint(startIndex, count, CIRCLE_RADIUS - ICON_RADIUS);
  const controlPoint1 = getPoint(
    startIndex,
    count,
    CIRCLE_RADIUS * CONTROL_POINT
  );
  const controlPoint2 = getPoint(
    endIndex,
    count,
    CIRCLE_RADIUS * CONTROL_POINT
  );
  const endPoint = getPoint(endIndex, count, CIRCLE_RADIUS - ICON_RADIUS);
  return createSVGElement('path', {
    ...PATH_CONFIG,
    d: `M ${toPair(startPoint)} C ${toPair(controlPoint1)} ${toPair(
      controlPoint2
    )} ${toPair(endPoint)}`,
  });
};

const createIcon = (index: number, count: number, label: string) => {
  const circle = createSVGElement('circle', {
    ...ICON_CONFIG,
  });
  const text = createSVGElement('text', ICON_LABEL_CONFIG);
  text.textContent = label;
  const g = createSVGElement('g', {
    transform: `rotate(${
      (index / count) * 360
    }) translate(${CIRCLE_RADIUS}, 0)`,
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
    fill: 'hsla(210, 100%, 70%, .3)',
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
    fill: 'none',
  });
  canvas.appendChild(circle);

  const count = 51;
  for (const i of range(count)) {
    const icon = createIcon(i, count, 'Hello');
    canvas.appendChild(icon);
  }

  for (const i of range(3, count, 3)) {
    const path = createPath(0, i, count);
    canvas.appendChild(path);
  }
  svg.appendChild(canvas);
  document.body.appendChild(svg);
};

window.onload = createView;

export const RECT_TYPE = {
  TXT: 'TXT',
  IMG: 'IMG',
  BAR: 'BAR',
};

export const TEMPLATE_TYPE = {
  1: {
    w: 198,
    h: 120,
  },
  2: {
    w: 297,
    h: 210,
  },
};

export const CONTROL_STATUS = {
  DRAW: 'DRAW',
  MOVE: 'MOVE',
  IDLE: 'IDLE',
};

export const defaultRectangleFormData = {
  text: '',
  fontSize: 14,
  fontWeight: 0.2,
  fontColor: '#000',
  border: 1,
  padding: 1,
  bgColor: '#fff',
  borderColor: '#000',
  barcode: '11111111',
  rotation: 0,
};

const recttest = {
  //   id: uuidv4(),
  type: RECT_TYPE.TXT,
  position: {
    x: 0,
    y: 0,
    w: 10,
    h: 10,
  },
  txt: {
    text: '',
    fontSize: 14,
    fontWeight: 0.2,
    fontColor: '#000',
    border: 1,
    padding: 1,
    bgColor: '#fff',
    borderColor: '#000',
  },
  bar: {
    code: '',
    rotation: 0,
    img: false,
  },
};

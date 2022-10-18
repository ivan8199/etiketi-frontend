export const getDefaultRectangleFormData = type => {
  return {
    text: '',
    fontSize: 14,
    fontWeight: 0.2,
    fontColor: '#000',
    border: 1,
    padding: 1,
    bgColor: '#fff',
    borderColor: '#000',
    code: '',
    rotation: 0,
  };
};

export const colors = [
  '#B80000',
  '#DB3E00',
  '#FCCB00',
  '#008B02',
  '#006B76',
  '#1273DE',
  '#004DCF',
  '#5300EB',
  '#EB9694',
  '#FAD0C3',
  '#FEF3BD',
  '#C1E1C5',
  '#BEDADC',
  '#C4DEF6',
  '#BED3F3',
  '#D4C4FB',
  '#000000',
  '#222222',
  '#444444',
  '#666666',
  '#888888',
  '#AAAAAA',
  '#CCCCCC',
  '#FFFFFF',
];

export const apiurl = process.env.REACT_APP_API_URL;

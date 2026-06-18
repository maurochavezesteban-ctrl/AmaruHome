// 1. PEGA AQUÍ TU ENLACE LARGO DE GOOGLE SHEETS (El que publicaste como .csv)
export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQS6SbFcSXENQNiY_AjcxD1P4JRJ7pcZWQVNHYJZXQdOLknGgub9P8pQZiDST_b53WYXsh9K_iomWj9/pub?output=csv";

// 2. Función para descargar los datos en tiempo real
export const fetchProductsFromSheets = async () => {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();
    
    const lines = csvText.split("\n");
    return lines.slice(1).map(line => {
      // Separa por comas respetando textos con comillas
      const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if (columns.length < 5) return null;
      
      return {
        id: Number(columns[0]),
        name: columns[1].replace(/^"|"$/g, '').trim(),
        cat: columns[2].replace(/^"|"$/g, '').trim(),
        price: Number(columns[3]),
        img: columns[4].replace(/^"|"$/g, '').trim()
      };
    }).filter(Boolean);
  } catch (error) {
    console.error("Error cargando productos desde Sheets:", error);
    return [];
  }
};

// --- TUS CATEGORÍAS Y VARIABLES SE MANTIENEN IGUAL ---
export const CATEGORIES = [
  { key: 'todas', label: 'Todas' },
  { key: 'sabanas', label: 'Juego de sábanas' },
  { key: 'acolchados', label: 'Acolchados' },
  { key: 'toallas', label: 'Toallas' },
  { key: 'alfombras', label: 'Alfombras' },
  { key: 'almohadas', label: 'Almohadas' },
  { key: 'cortinas', label: 'Cortinas' },
  { key: 'frazadas', label: 'Frazadas' },
  { key: 'edredon', label: 'Edredón'}
];

export const CAT_LABELS = {
  sabanas: 'Sábanas', acolchados: 'Acolchados', toallas: 'Toallas',
  alfombras: 'Alfombras', almohadas: 'Almohadas', cortinas: 'Cortinas', frazadas: 'Frazadas',
};

export const WA_NUMBER = '5491140643880';

export const fmt = (n) => '$' + n.toLocaleString('es-AR');

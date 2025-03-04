import path from 'path';
import { fileURLToPath } from 'url';
import i18n from 'i18n';
// Manually create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
i18n.configure({
  locales: ['en', 'fr', 'ar'], // Supported languages
  directory: path.join(__dirname, 'locals'), // Folder where translations are stored
  defaultLocale: 'en', // Default language
  queryParameter: 'lang', // Allow language switching via URL (e.g., ?lang=fr)
  autoReload: true, // Automatically reload translations when files change
  syncFiles: false, // Sync new keys to all locale files
  objectNotation: true, // Allows nested JSON keys
  updateFiles: false,
});

export default i18n;

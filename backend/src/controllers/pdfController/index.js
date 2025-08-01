const pug = require('pug');
const fs = require('fs');
const moment = require('moment');
let pdf = require('html-pdf');
const { listAllSettings, loadSettings } = require('@/middlewares/settings');
const { getData } = require('@/middlewares/serverData');
const useLanguage = require('@/locale/useLanguage');
const { useMoney, useDate } = require('@/settings');
const invoiceController = require('@/controllers/appControllers/invoiceController');

const pugFiles = ['invoice', 'offer', 'quote', 'payment', 'query'];

require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

exports.generatePdf = async (
  modelName,
  info = { filename: 'pdf_file', format: 'A5', targetLocation: '' },
  result,
  callback
) => {
  try {
    const { targetLocation } = info;

    // if PDF already exists, then delete it and create a new PDF
    if (fs.existsSync(targetLocation)) {
      fs.unlinkSync(targetLocation);
    }

    // render pdf html

    if (pugFiles.includes(modelName.toLowerCase())) {
        let summary = '';
        if (modelName.toLowerCase() === 'invoice') {
          // Mock req and res objects for summarizeNotes controller
          const mockReq = { params: { id: result._id } };
          const mockRes = {
            status: function(code) {
              return this;
            },
            json: function(data) {
              return data;
            }
          };
          const summaryResponse = await invoiceController.summarizeNotes(mockReq, mockRes);
          if (summaryResponse.success) {
            summary = summaryResponse.result;
          } else {
            summary = 'Error generating summary for PDF.';
          }
        }

        // Compile Pug template

      const settings = await loadSettings();
      const selectedLang = settings['idurar_app_language'];
      const translate = useLanguage({ selectedLang });

      const {
        currency_symbol,
        currency_position,
        decimal_sep,
        thousand_sep,
        cent_precision,
        zero_format,
      } = settings;

      const { moneyFormatter } = useMoney({
        settings: {
          currency_symbol,
          currency_position,
          decimal_sep,
          thousand_sep,
          cent_precision,
          zero_format,
        },
      });
      const { dateFormat } = useDate({ settings });

      settings.public_server_file = process.env.PUBLIC_SERVER_FILE;

      const htmlContent = pug.renderFile('src/pdf/' + modelName + '.pug', {
          model: result,
          settings,
          translate,
          dateFormat,
          moneyFormatter,
          moment: moment,
          summary: summary, // Pass summary to Pug template
        });

      pdf
        .create(htmlContent, {
          format: info.format,
          orientation: 'portrait',
          border: '10mm',
        })
        .toFile(targetLocation, function (error) {
          if (error) throw new Error(error);
          if (callback) callback();
        });
    }
  } catch (error) {
    throw new Error(error);
  }
};

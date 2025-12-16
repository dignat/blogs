const fs = require('fs');
const pdf = require('html-pdf');

// Read the HTML content
const htmlContent = fs.readFileSync('task_report.html', 'utf8');

// PDF generation options
const options = {
    format: 'Letter',
    border: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
    },
    timeout: 30000
};

// Create PDF from HTML
pdf.create(htmlContent, options).toFile('task_report.pdf', function(err, res) {
    if (err) {
        console.error('Error generating PDF:', err);
    } else {
        console.log('PDF report generated successfully: task_report.pdf');
    }
});
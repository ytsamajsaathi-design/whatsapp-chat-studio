/**
 * Google Sheets & CSV Integration Module
 * Supports CSV export/import and an in-app interactive spreadsheet editor.
 */
class SheetsManager {
  /**
   * Export message array to CSV string
   * @param {Array} messages
   * @returns {string}
   */
  static exportToCSV(messages) {
    const headers = ["id", "sender", "type", "text", "time", "status", "delay_seconds", "voice_id"];
    const rows = [headers.join(",")];

    for (const msg of messages) {
      const escape = (val) => {
        if (val === undefined || val === null) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      const row = [
        escape(msg.id),
        escape(msg.sender),
        escape(msg.type),
        escape(msg.text),
        escape(msg.time),
        escape(msg.status),
        escape(msg.delay !== undefined ? msg.delay : 1.0),
        escape(msg.voiceId || "")
      ];
      rows.push(row.join(","));
    }

    return rows.join("\r\n");
  }

  /**
   * Trigger automatic download of CSV file
   * @param {Array} messages
   * @param {string} filename
   */
  static downloadCSV(messages, filename = "whatsapp_dialogue.csv") {
    const csvContent = SheetsManager.exportToCSV(messages);
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Robust CSV parser handling quoted cells and line breaks
   * @param {string} text
   * @returns {Array<object>}
   */
  static parseCSV(text) {
    const lines = [];
    let row = [];
    let cell = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const next = text[i + 1];

      if (c === '"') {
        if (inQuotes && next === '"') {
          cell += '"';
          i++; // Skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        row.push(cell.trim());
        cell = "";
      } else if ((c === '\r' || c === '\n') && !inQuotes) {
        if (c === '\r' && next === '\n') i++;
        row.push(cell.trim());
        if (row.some(val => val.length > 0)) {
          lines.push(row);
        }
        row = [];
        cell = "";
      } else {
        cell += c;
      }
    }
    if (cell.length > 0 || row.length > 0) {
      row.push(cell.trim());
      if (row.some(val => val.length > 0)) {
        lines.push(row);
      }
    }

    if (lines.length < 2) return [];

    const headers = lines[0].map(h => h.toLowerCase());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const current = lines[i];
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        const key = headers[j];
        obj[key] = current[j] || "";
      }

      result.push({
        id: obj.id || `msg_${Date.now()}_${i}`,
        sender: obj.sender === 'receiver' || obj.sender === 'B' || obj.sender === 'Person B' ? 'receiver' : 'sender',
        type: obj.type === 'voice' ? 'voice' : 'text',
        text: obj.text || "",
        time: obj.time || "10:45 AM",
        status: obj.status || "read", // sent, delivered, read
        delay: parseFloat(obj.delay_seconds) || 1.2,
        voiceId: obj.voice_id || ""
      });
    }

    return result;
  }
}

window.SheetsManager = SheetsManager;

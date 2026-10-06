/**
 * Zero-dependency client-side ZIP archive generator.
 * Supports adding binary files (e.g. PNG Uint8Arrays or Blobs) and generating a downloadable ZIP.
 */
class SimpleZip {
  constructor() {
    this.files = [];
  }

  // Precomputed CRC32 table
  static crcTable = (() => {
    let c;
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c;
    }
    return table;
  })();

  static calculateCrc32(data) {
    let crc = 0 ^ (-1);
    const table = SimpleZip.crcTable;
    for (let i = 0; i < data.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }

  /**
   * Add a file to the ZIP
   * @param {string} filename - e.g. "frame_0001.png"
   * @param {Uint8Array} data - binary file data
   */
  addFile(filename, data) {
    const encoder = new TextEncoder();
    const filenameBytes = encoder.encode(filename);
    const crc = SimpleZip.calculateCrc32(data);
    this.files.push({
      name: filename,
      nameBytes: filenameBytes,
      data: data,
      crc: crc,
      size: data.length
    });
  }

  /**
   * Generate ZIP Blob
   * @returns {Blob}
   */
  generateBlob() {
    let totalSize = 0;
    const fileHeaders = [];
    let offset = 0;

    // Calculate local file headers & data sizes
    for (const file of this.files) {
      const headerLength = 30 + file.nameBytes.length;
      fileHeaders.push({
        offset: offset,
        headerLength: headerLength
      });
      offset += headerLength + file.size;
    }

    const centralDirectoryOffset = offset;
    let centralDirectorySize = 0;

    for (const file of this.files) {
      centralDirectorySize += 46 + file.nameBytes.length;
    }

    const eocdSize = 22;
    totalSize = centralDirectoryOffset + centralDirectorySize + eocdSize;

    const buffer = new Uint8Array(totalSize);
    const view = new DataView(buffer.buffer);
    let pos = 0;

    const now = new Date();
    const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
    const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

    // 1. Write Local File Headers + File Data
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];

      view.setUint32(pos, 0x04034b50, true);
      view.setUint16(pos + 4, 20, true);
      view.setUint16(pos + 6, 0x0800, true); // UTF-8 filename flag
      view.setUint16(pos + 8, 0, true); // Stored (no compression for speed & max compatibility)
      view.setUint16(pos + 10, dosTime, true);
      view.setUint16(pos + 12, dosDate, true);
      view.setUint32(pos + 14, file.crc, true);
      view.setUint32(pos + 18, file.size, true);
      view.setUint32(pos + 22, file.size, true);
      view.setUint16(pos + 26, file.nameBytes.length, true);
      view.setUint16(pos + 28, 0, true);
      pos += 30;

      buffer.set(file.nameBytes, pos);
      pos += file.nameBytes.length;

      buffer.set(file.data, pos);
      pos += file.size;
    }

    // 2. Write Central Directory Headers
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const headerInfo = fileHeaders[i];

      view.setUint32(pos, 0x02014b50, true);
      view.setUint16(pos + 4, 20, true);
      view.setUint16(pos + 6, 20, true);
      view.setUint16(pos + 8, 0x0800, true);
      view.setUint16(pos + 10, 0, true);
      view.setUint16(pos + 12, dosTime, true);
      view.setUint16(pos + 14, dosDate, true);
      view.setUint32(pos + 16, file.crc, true);
      view.setUint32(pos + 20, file.size, true);
      view.setUint32(pos + 24, file.size, true);
      view.setUint16(pos + 28, file.nameBytes.length, true);
      view.setUint16(pos + 30, 0, true);
      view.setUint16(pos + 32, 0, true);
      view.setUint16(pos + 34, 0, true);
      view.setUint16(pos + 36, 0, true);
      view.setUint32(pos + 38, 0, true);
      view.setUint32(pos + 42, headerInfo.offset, true);
      pos += 46;

      buffer.set(file.nameBytes, pos);
      pos += file.nameBytes.length;
    }

    // 3. Write End of Central Directory Record
    view.setUint32(pos, 0x06054b50, true);
    view.setUint16(pos + 4, 0, true);
    view.setUint16(pos + 6, 0, true);
    view.setUint16(pos + 8, this.files.length, true);
    view.setUint16(pos + 10, this.files.length, true);
    view.setUint32(pos + 12, centralDirectorySize, true);
    view.setUint32(pos + 16, centralDirectoryOffset, true);
    view.setUint16(pos + 20, 0, true);

    return new Blob([buffer], { type: "application/zip" });
  }
}

window.SimpleZip = SimpleZip;

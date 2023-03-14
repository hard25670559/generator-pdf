import { createPDF } from './createPDF.js';
import fs from 'fs';

import express from 'express';
const app = express()
const port = 3000
app.get('/', async (req, res) => {

  const filePath = await createPDF();

  res.set({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename=${filePath}`,
  });

  // 讀取檔案內容，並傳送給客戶端
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

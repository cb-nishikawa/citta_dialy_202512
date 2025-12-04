const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '../src/assets/image');

// スケール設定
const scales = [
  { scale: 1, suffix: '' },
  { scale: 0.7, suffix: '_0.7' },
  { scale: 0.5, suffix: '_0.5' },
  { scale: 0.3, suffix: '_0.3' }
];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

function deleteExistingWebP(baseName) {
  scales.forEach(({ suffix }) => {
    const webpPath = baseName + suffix + '.webp';
    try {
      if (fs.existsSync(webpPath)) {
        fs.unlinkSync(webpPath);
        console.log(`Deleted: ${webpPath}`);
      }
    } catch (err) {
      console.warn(`Could not delete ${webpPath}:`, err.message);
    }
  });
}

// 先に全ての画像ファイルを収集
const imageFiles = [];
walkDir(targetDir, (filePath) => {
  if (/\.(png|jpg|jpeg)$/i.test(filePath)) {
    imageFiles.push(filePath);
  }
});

// 次に既存のWebPを削除
imageFiles.forEach(filePath => {
  const baseName = filePath.replace(/\.(png|jpg|jpeg)$/i, '');
  deleteExistingWebP(baseName);
});

// 最後にWebPを生成
imageFiles.forEach(filePath => {
  const baseName = filePath.replace(/\.(png|jpg|jpeg)$/i, '');
  
  // メタデータを取得してオリジナルサイズを取得
  sharp(filePath)
    .metadata()
    .then(metadata => {
      const baseWidth = metadata.width;
      
      // 各スケールでWebP化
      scales.forEach(({ scale, suffix }) => {
        const newWidth = Math.round(baseWidth * scale);
        const outPath = baseName + suffix + '.webp';
        
        sharp(filePath)
          .resize(newWidth, null, { withoutEnlargement: true })
          .webp({ quality: 40 })
          .toFile(outPath)
          .then(() => {
            console.log(`Converted: ${filePath} -> ${outPath} (${scale}x scale, ${newWidth}w)`);
          })
          .catch(err => {
            console.error(`Error converting ${filePath} (${scale}x):`, err);
          });
      });
    })
    .catch(err => {
      console.error(`Error reading metadata for ${filePath}:`, err);
    });
});

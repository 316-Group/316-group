const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
require('dotenv').config();

async function testR2() {
  try {
    const s3 = new S3Client({
      region: process.env.R2_REGION || 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    console.log(`Connecting to bucket: ${process.env.R2_BUCKET}`);
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET,
      MaxKeys: 5,
    });

    const response = await s3.send(command);
    console.log('SUCCESS! Access to R2 bucket is working.');
    console.log(`Found ${response.KeyCount} objects in this request (showing up to 5).`);
    if (response.Contents) {
      response.Contents.forEach((item) => {
        console.log(` - ${item.Key} (${item.Size} bytes)`);
      });
    }
  } catch (error) {
    console.error('ERROR accessing R2 bucket:', error);
  }
}

testR2();

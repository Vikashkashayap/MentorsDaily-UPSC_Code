# S3 file storage — setup and Postman

## Environment variables

Set in `UPSC-Backend/.env` (never commit real secrets):

| Variable | Required | Description |
|----------|----------|-------------|
| `AWS_REGION` | Yes | e.g. `eu-north-1` |
| `AWS_ACCESS_KEY_ID` | Yes | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | Yes | IAM secret |
| `AWS_BUCKET_NAME` | Yes* | Bucket name (*or use `AWS_S3_BUCKET`) |
| `AWS_S3_PUBLIC_BASE_URL` | No | CDN/CloudFront origin URL without trailing slash |
| `AWS_S3_OBJECT_ACL` | No | `public-read` only if bucket allows ACLs |
| `UPLOAD_MAX_FILE_BYTES` | No | Default 52428800 (50 MB) |

## IAM policy (minimal)

Allow `s3:PutObject` (and optionally `s3:DeleteObject`) on `arn:aws:s3:::YOUR_BUCKET/uploads/*`.

## Bucket access for public URLs

Either:

- **Bucket policy** allowing `s3:GetObject` on `arn:aws:s3:::YOUR_BUCKET/uploads/*` for `Principal: "*"`, or  
- **Private bucket** + CloudFront (set `AWS_S3_PUBLIC_BASE_URL` to the distribution origin that serves objects).

If uploads return **403** in the browser, fix bucket policy / Block Public Access / OAC, not the app code.

Example bucket policy (adjust bucket name; allows public read only under `uploads/`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadUploads",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/uploads/*"
    }
  ]
}
```

In S3 → **Permissions** → **Block public access**: you must allow bucket policies to grant public access if you use the above (or use CloudFront + OAC instead).

## Smoke test (CLI)

From `UPSC-Backend`:

```bash
npm install
npm run test:s3
```

You should see `OK: https://...amazonaws.com/uploads/images/...png`. Open that URL in a browser.

## Postman — generic upload

- **Method:** `POST`  
- **URL:** `{{baseUrl}}/api/v1/upload`  
- **Headers:** `Authorization: Bearer {{adminJwt}}`  
- **Body:** `form-data`  
  - `file`: type **File**, pick a JPG/PNG/PDF  
  - `folder` (optional): `images` | `pdfs` | `thumbnails`  

**Response:** `data.url` is the public S3 URL.

## Postman — course thumbnail

- **POST** `{{baseUrl}}/api/v1/create-course`  
- **Headers:** `Authorization: Bearer {{adminJwt}}`  
- **Body:** `form-data` — text fields (`title`, `description`, `category`, `basePrice`, …) + `thumbnail` (file)

**Check:** `GET {{baseUrl}}/api/v1/get-course` — each course should show `thumbnailUrl` as an `https://...` string.

## Postman — current affairs image

- **POST** `{{baseUrl}}/api/v1/create-affair`  
- **Headers:** `Authorization: Bearer {{adminJwt}}`  
- **Body:** `form-data` — affair fields + optional `thumbnail` (image file)

## Postman — preparation blog

- **POST** `{{baseUrl}}/api/v1/preparation/create-blog`  
- **Headers:** `Authorization: Bearer {{adminJwt}}`  
- **Body:** `form-data` — `title`, `content`, … + `file` (PDF → `pdfUrl`, image → `thumbnailUrl`)

## Migration

After backups:

```bash
MIGRATE_S3_DRY_RUN=1 npm run migrate:s3
npm run migrate:s3
```

Optional: `MIGRATE_S3_DELETE_UPLOADED_DOCS=1 npm run migrate:s3` to remove legacy `UploadedDocuments` after you have verified data.

## Security note

If AWS keys were ever pasted into chat, email, or a ticket, **rotate them** in IAM and update `.env`.

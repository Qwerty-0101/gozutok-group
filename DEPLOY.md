# Group Deploy Notu

Bu proje production'da parent klasördeki `docker-compose.prod.yml` ile ayağa kalkar.

## Build/Run
Bu klasörde bağımsız komutlar:

```bash
docker build -t group-app .
docker run --rm -p 3000:3000 group-app
```

## Production'da
Production için bu klasörü `gozutok-deploy/group` olarak sunucuya kopyalayın ve
root'taki compose dosyasını çalıştırın.

## İletişim formu (SMTP)
Form `POST /api/contact` üzerinden Google SMTP ile e-posta gönderir. Aşağıdaki
ortam değişkenleri gereklidir (parent `.env.prod` içinde tanımlanır):

- `SMTP_USER` — Gmail adresi
- `SMTP_PASS` — Gmail App Password (16 haneli)
- `CONTACT_TO` — formların düşeceği e-posta (opsiyonel, boşsa SMTP_USER)
- `SMTP_HOST` (varsayılan `smtp.gmail.com`)
- `SMTP_PORT` (varsayılan `465`)
- `SMTP_SECURE` (varsayılan `true`)

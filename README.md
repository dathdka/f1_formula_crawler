# SETUP

1. build image cho project: `docker-compose build`
2. Khởi chạy container database: `docker-compose up -d postgres`
3. Khởi chạy container API: `docker-compose up -d api`
4. Khởi chạy lệnh migrate database : `docker-compose exec api npx knex migrate:latest --knexfile src/knexfile.ts`
5. Bắt đầu crawl dữ liệu : `docker-compose up -d crawler`

Dừng tất cả container đang chạy: `docker-compose down`

### Restore database

_(Quá trình Crawl data có thể sẽ mất khá nhiều thời gian nên có thể restore từ file backup database đã được crawl từ trước `public\formula_backup`)_
_(Nếu chưa chạy lệnh migrate có thể skip bước 1 và 2)_
1. Unlock migrate: `docker-compose exec api npx knex migrate:unlock --knexfile src/knexfile.ts`

2. Rollback migrate: `docker-compose exec api npx knex migrate:rollback --knexfile src/knexfile.ts`

3. Sử dụng tool SQL client (PgAdmin4, DBeaver,...) để kết nối với database postgres đang chạy trên docker vơi cấu hình:
   <a href="https://drive.google.com/uc?export=view&id=1iQiV7U8D7qZRIWlQr6UH6qAG9UbDHA_k"><img src="https://drive.google.com/uc?export=view&id=1iQiV7U8D7qZRIWlQr6UH6qAG9UbDHA_k" style="width: 650px; max-width: 100%; height: auto" title="Click to enlarge picture" />

   Host: localhost
   Port: 5436
   Database: formula
   Username: postgres
   Password: postgres
4. Tiến hành restore bằng file backup 
   <a href="https://drive.google.com/uc?export=view&id=18OGKvnpL9fYXwcng8scsK8QAPmWfgjz5"><img src="https://drive.google.com/uc?export=view&id=18OGKvnpL9fYXwcng8scsK8QAPmWfgjz5" style="width: 650px; max-width: 100%; height: auto" title="Click to enlarge picture" />

   <a href="https://drive.google.com/uc?export=view&id=1namcV568u83vEStmycrCgxozzfTRfFU3"><img src="https://drive.google.com/uc?export=view&id=1namcV568u83vEStmycrCgxozzfTRfFU3" style="width: 650px; max-width: 100%; height: auto" title="Click to enlarge picture" />




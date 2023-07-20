Mục lục
<br/>
1. [SETUP](SETUP)
2. [CONTENT](CONTENT)

# SETUP 

1. build image cho project: `docker-compose build`
2. Khởi chạy container database: `docker-compose up -d postgres`
3. Khởi chạy container API: `docker-compose up -d api`
4. Khởi chạy lệnh migrate database : `docker-compose exec api npx knex migrate:latest --knexfile src/knexfile.ts`
5. Bắt đầu crawl dữ liệu : `docker-compose up -d crawler`

Dừng tất cả container đang chạy: `docker-compose down`

## Restore database

_(Quá trình Crawl data có thể sẽ mất khá nhiều thời gian nên có thể restore từ file backup database đã được crawl từ trước `public\formula_backup`)_
_(Nếu chưa chạy lệnh migrate có thể skip bước 1 và 2)_
1. Unlock migrate: `docker-compose exec api npx knex migrate:unlock --knexfile src/knexfile.ts`

2. Rollback migrate: `docker-compose exec api npx knex migrate:rollback --knexfile src/knexfile.ts`

3. Sử dụng tool SQL client (PgAdmin4, DBeaver,...) để kết nối với database postgres đang chạy trên docker vơi cấu hình:
   <img src="https://drive.google.com/uc?export=view&id=1iQiV7U8D7qZRIWlQr6UH6qAG9UbDHA_k" style="width: 650px; max-width: 100%; height: auto" />

   <br/>Host: localhost
   <br/>Port: 5436
   <br/>Database: formula
   <br/>Username: postgres
   <br/>Password: postgres
4. Tiến hành restore bằng file backup 
 <br/><img src="https://drive.google.com/uc?export=view&id=18OGKvnpL9fYXwcng8scsK8QAPmWfgjz5" style="width: 650px; max-width: 100%; height: auto" />

   <br/><img src="https://drive.google.com/uc?export=view&id=1namcV568u83vEStmycrCgxozzfTRfFU3" style="width: 650px; max-width: 100%; height: auto" />
 

# CONTENT <a name="CONTENT"></a>
## A. Crawl data
Ứng dụng sử dụng Puppeteer để crawl dữ liệu lịch sử kết quả từ trang chủ của cuộc đua công thức F1 (`https://www.formula1.com`) và lưu trữ vào cơ sở dữ liệu PostgreSQL 
### Xây dựng Database
   <br/> <img src="https://drive.google.com/uc?export=view&id=1Z50XWukYSMHlTGt0S1AFoGaRttO_8D1m" style="width: 650px; max-width: 100%; height: auto" />

## B. API
_(Có thể import file postman collection tại `public/Formula.postman_collection.json` để xem chi tiết hơn)_
<br/>Dưới đây là danh sách các API có hiện có:
       <br/> <img src="https://drive.google.com/uc?export=view&id=19gyoDq1NvYi1ckQBZzA96ZEHgwv7uQAU" style="width: 650px; max-width: 100%; height: auto" />
### 1. Driver
   #### 1.1 Tìm kiếm driver với custom filter
   Mô tả: Lấy tất cả tay đua (drivers) phù hợp với các custom filter có liên quan tới table drivers dưới đây
   <br/>Các entity liên quan đến entity drivers :
   <br/> <img src="https://drive.google.com/uc?export=view&id=1HTOvQF6EN3hmumcNAhYMzASD4S_efWHf" style="width: 650px; max-width: 100%; height: auto" />
   <br/>Ví dụ:
   Lấy tất cả tay đua đã từng tham gia vào mùa giải 2012 trở về sau, ta có thể truyền vào một hoặc nhiều param như sau:
   <b> `seasons@name.greaterThan=2012`</b>
   <br/>Trong đó:
   <br/>seasons: Table seasons
   <br/>name: Column "name" tại table seasons
   <br/>"@": Đại diện cho ký tự liên kết giữa column và table
   <br/>greaterThan: Toán tử điều kiện ">="
   <br/>".": Đại diện cho ký tự phân biệt giữa field cần so sánh và toán tử điều kiện
   <br/> <img src="https://drive.google.com/uc?export=view&id=1mRsaOKuW1BBebfymqN0kiv7mX8YYZ0hI" style="width: 650px; max-width: 100%; height: auto" />
   #### 1.2 Tìm kiếm driver với id
   Mô tả: Lấy tay đua có id được truyền vào
   <br/> <img src="https://drive.google.com/uc?export=view&id=1VAmCgIQ40_B5cpsSPamGJM9mgtgSfzKa" style="width: 650px; max-width: 100%; height: auto" />
   #### 1.3 Tìm kiếm những mùa giải mà driver đã tham gia
   Mô tả: Lấy tất cả mùa giải mà driver đã từng tham gia theo driver id
   <br/> <img src="https://drive.google.com/uc?export=view&id=1KpnxSPqZ6lm3_koggM_EaYPq00SyYf1M" style="width: 650px; max-width: 100%; height: auto" />
   #### 1.4 Tìm kiếm những chiếc xe đã từng được driver sử dụng
   Mô tả: Tìm kiếm những chiếc xe đã từng được driver sử dụng theo driver id
   <br/> <img src="https://drive.google.com/uc?export=view&id=1rWNueg_XWKPOxoELrYhFv9LXVmdkN_SE" style="width: 650px; max-width: 100%; height: auto" />
   #### 1.5 Tìm kiếm lịch sử sự nghiệp của driver
   Mô tả: Tìm kiếm lịch sử sự nghiệp của driver theo driver id
   <br/> <img src="https://drive.google.com/uc?export=view&id=13L4Yq3vAeA7SGmfPNnn-tro3NwKUL-GK" style="width: 650px; max-width: 100%; height: auto" />
### 2. Season
   #### 2.1 Tìm kiếm mùa giải (seasons) với custom filter
   Mô tả: Lấy tất cả mùa giải phù hợp với các custom filter có liên quan tới table drives dưới đây
   <br/>Các entity liên quan đến entity seasons :
   <br/> <img src="https://drive.google.com/uc?export=view&id=1HclBsA-7ej7E9rZzcOf1umP4O3HevK7U" style="width: 650px; max-width: 100%; height: auto" />
   <br/>Ví dụ:
   Lấy tất cả các mùa giải có sự tham gia của xe có tên gần giống "Mercedes", ta có thể truyền vào một hoặc nhiều param như sau:
   <b> `cars@name.like=Mercedes`</b>
   <br/>Trong đó:
   <br/>cars: Table cars
   <br/>name: Column "name" tại table cars
   <br/>"@": Đại diện cho ký tự liên kết giữa column và table
   <br/>like: Toán tử điều kiện "like"
   <br/>".": Đại diện cho ký tự phân biệt giữa field cần so sánh và toán tử điều kiện
   <br/> <img src="https://drive.google.com/uc?export=view&id=1rc1N-0ec77j8izLbhdkBnbXD8RU0G1NY" style="width: 650px; max-width: 100%; height: auto" />
   #### 2.2 Tìm kiếm mùa giải (seasons) với tên mùa giải
   Mô tả: Lấy thông mùa giải theo tên
   <br/> <img src="https://drive.google.com/uc?export=view&id=1S1-WGxAsFucMVXxlguzDAgafonCFU_Iw" style="width: 650px; max-width: 100%; height: auto" />
   #### 2.3 Tìm kiếm thông tin người dẫn đầu
   Mô tả: Lấy thông tin người có số điểm cao nhất mùa giải
   <br/> <img src="https://drive.google.com/uc?export=view&id=13ydS28yVSxe2f44jdpiHuCNXWRWAYdSg" style="width: 650px; max-width: 100%; height: auto" />
   #### 2.4 Tìm kiếm thông tin các đội (teams)
   Mô tả: Lấy thông tin các đội tham gia mùa giải theo tên mùa giải
   <br/> <img src="https://drive.google.com/uc?export=view&id=1rAnKFZW-JnQ7oa789GqZBumu3QArRlH4" style="width: 650px; max-width: 100%; height: auto" />
### 3. Car
   #### 3.1 Tìm kiếm thông tin xe (cars) với custom filter
   Mô tả: Lấy tất cả xe phù hợp với các custom filter có liên quan tới table cars dưới đây
   <br/>Các entity liên quan đến entity cars :
   <br/> <img src="https://drive.google.com/uc?export=view&id=1ocDixRUUTrO_hI754gyyzBdZGK0ZnBvv" style="width: 650px; max-width: 100%; height: auto" />
   <br/>Ví dụ:
   Lấy tất cả xe đã từng được tay đua bất kỳ sử dụng và đạt top 3 trở lên, ta có thể truyền vào một hoặc nhiều param như sau:
   <b> `driver_rank@position.lessThan=4`</b>
   <br/>Trong đó:
   <br/>driver_rank: Table driver_rank
   <br/>position: Column "position" tại table driver_rank
   <br/>"@": Đại diện cho ký tự liên kết giữa column và table
   <br/>lessThan: Toán tử điều kiện "<"
   <br/>".": Đại diện cho ký tự phân biệt giữa field cần so sánh và toán tử điều kiện
   <br/> <img src="https://drive.google.com/uc?export=view&id=1S31p882zHqKgPyUGdbh1mTJlu3oElxYD" style="width: 650px; max-width: 100%; height: auto" />
   #### 3.2 Tìm kiếm các tay đua đã từng điều khiển xe
   Mô tả: Lấy tất cả tay đua đã từng điều khiển xe theo tên xe
   <br/> <img src="https://drive.google.com/uc?export=view&id=1o_mWqN49QYXGsps17B8WbR7v6wl4MNb3" style="width: 650px; max-width: 100%; height: auto" />

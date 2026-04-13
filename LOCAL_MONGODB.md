# 本地 MongoDB 说明

这份文档专门说明当前项目里，本地 MongoDB 是怎么启动的，以及为什么数据会落到 `.mongodb-data` 目录。

## 1. 先说结论

当前项目里：

- 项目代码负责连接 `mongodb://localhost:27017/enterprise`
- 本地 MongoDB 进程负责把数据库文件写到 `.mongodb-data`

所以：

- `enterprise` 是数据库名
- `products` 是集合名
- `.mongodb-data` 是数据库文件存放目录

这三者不是一回事。

## 2. 谁决定连接哪个数据库

由项目配置决定。

文件：

- [`.env`](D:/Xia/my/test/enterprise-website/.env)

当前内容：

```env
MONGODB_URI=mongodb://localhost:27017/enterprise
```

含义：

- `localhost`
  连接本机数据库服务
- `27017`
  MongoDB 默认端口
- `enterprise`
  数据库名

项目读取这串地址的代码在：

- [server/utils/db.js](D:/Xia/my/test/enterprise-website/server/utils/db.js)

这个文件的职责只是：

- 读取 `MONGODB_URI`
- 用 `mongoose.connect(...)` 建立连接

它不会决定数据库文件放在哪个文件夹。

## 3. 谁决定数据文件放到 `.mongodb-data`

由 `mongod` 进程启动参数决定。

当时本地 MongoDB 是这样启动的：

```powershell
mongod --dbpath D:\Xia\my\test\enterprise-website\.mongodb-data --bind_ip 127.0.0.1 --port 27017
```

其中最关键的是：

```powershell
--dbpath D:\Xia\my\test\enterprise-website\.mongodb-data
```

这个参数的意思就是：

- 把数据库文件存到 `D:\Xia\my\test\enterprise-website\.mongodb-data`

所以你看到商品数据最终落到了这个目录。

## 4. 为什么项目代码里看不到 `.mongodb-data`

因为 `.mongodb-data` 不是业务代码里的概念，而是 MongoDB 服务自身的存储目录。

项目代码只知道：

```text
去连 localhost:27017 上的 enterprise 数据库
```

至于这个 MongoDB 服务自己把文件存在：

- `C:\data\db`
- `D:\mongo-data`
- `D:\Xia\my\test\enterprise-website\.mongodb-data`

项目代码并不关心。

这由启动 `mongod` 的人决定。

## 5. 这几个概念怎么区分

### `enterprise`

这是数据库名。

来源：

- [`.env`](D:/Xia/my/test/enterprise-website/.env)

### `products`

这是集合名。

来源：

- [server/models/Product.js](D:/Xia/my/test/enterprise-website/server/models/Product.js)

里面的模型：

```js
mongoose.model('Product', ProductSchema)
```

Mongoose 会把 `Product` 映射成集合名 `products`。

### `.mongodb-data`

这是数据库文件目录。

来源：

- `mongod --dbpath ...`

## 6. `.mongodb-data` 里面的文件是什么

目录：

- [`.mongodb-data`](D:/Xia/my/test/enterprise-website/.mongodb-data)

里面你会看到：

- `collection-*.wt`
- `index-*.wt`
- `WiredTiger`
- `WiredTiger.wt`
- `mongod.log`

说明：

- 这些是 MongoDB 底层存储文件
- 不是给人直接手工编辑的
- 你不能把一条商品当作一个独立文本文件去打开

## 7. 如果换目录，会发生什么

比如以后用下面这种方式启动：

```powershell
mongod --dbpath D:\mongo-data --bind_ip 127.0.0.1 --port 27017
```

那数据库文件就会写到：

```text
D:\mongo-data
```

但只要 `.env` 还是：

```env
MONGODB_URI=mongodb://localhost:27017/enterprise
```

项目代码仍然会照常连接 `enterprise`。

区别只是：

- MongoDB 文件落盘位置变了
- 项目代码本身不用改

## 8. 当前项目怎么查看真实数据

### 方式 1：MongoDB Compass

连接：

```text
mongodb://localhost:27017
```

然后展开：

```text
enterprise
  -> products
```

### 方式 2：项目管理页

打开：

```text
/admin-products
```

### 方式 3：直接查数据库

按名称查：

```js
db.products.find({ name: '啊啊啊啊' })
```

## 9. 当前项目最重要的一句话

当前项目里：

- `.env` 决定连哪个数据库服务
- `Product.js` 决定集合结构
- `mongod --dbpath ...` 决定数据库文件落在哪个目录

所以，数据存在 `.mongodb-data` 的根本原因，不是某一段业务代码写死了它，而是本地 MongoDB 启动时把 `dbpath` 指到了这里。

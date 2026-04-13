# 数据流说明

这份文档说明当前项目里，商品数据是如何从页面进入 MongoDB 的。

## 1. 整体链路

当前项目里，商品数据的流转路径是：

```text
pages/products.vue
  -> /api/products
  -> server/api/products/index.post.js
  -> server/services/productService.js
  -> server/models/Product.js
  -> MongoDB 数据库 enterprise
  -> 集合 products
```

查看数据时的链路是：

```text
pages/admin-products.vue
  -> /api/products
  -> server/api/products/index.get.js
  -> server/services/productService.js
  -> server/models/Product.js
  -> MongoDB 数据库 enterprise
  -> 集合 products
```

## 2. 关键文件说明

### 2.1 前端页面

商品录入页面：

- [pages/products.vue](D:/Xia/my/test/enterprise-website/pages/products.vue)

作用：

- 显示商品列表
- 提交新增商品表单
- 编辑商品
- 删除商品

这里的新增商品代码会调用：

```js
await $fetch('/api/products', {
  method: 'POST',
  body: newProduct.value
})
```

这表示前端不是直接连数据库，而是把数据发给后端接口。

管理页：

- [pages/admin-products.vue](D:/Xia/my/test/enterprise-website/pages/admin-products.vue)

作用：

- 直接读取数据库里的真实商品数据
- 删除数据库中的商品

## 3. 后端接口

新增商品接口：

- [server/api/products/index.post.js](D:/Xia/my/test/enterprise-website/server/api/products/index.post.js)

作用：

- 接收前端传来的商品数据
- 调用 `createProduct(...)`

查询商品接口：

- [server/api/products/index.get.js](D:/Xia/my/test/enterprise-website/server/api/products/index.get.js)

作用：

- 从数据库里读取商品列表

更新商品接口：

- [server/api/products/[id].put.js](D:/Xia/my/test/enterprise-website/server/api/products/%5Bid%5D.put.js)

删除商品接口：

- [server/api/products/[id].delete.js](D:/Xia/my/test/enterprise-website/server/api/products/%5Bid%5D.delete.js)

## 4. 服务层

文件：

- [server/services/productService.js](D:/Xia/my/test/enterprise-website/server/services/productService.js)

作用：

- 统一处理商品数据的增删改查
- 对传入的数据做一次格式整理

这里的几个核心方法：

- `listProducts()`
- `getProductById(id)`
- `createProduct(payload)`
- `updateProductById(id, payload)`
- `deleteProductById(id)`

可以把它理解成：

- 页面只负责提交
- API 只负责接收请求
- `productService` 负责真正操作商品数据

## 5. Mongoose 模型

文件：

- [server/models/Product.js](D:/Xia/my/test/enterprise-website/server/models/Product.js)

作用：

- 定义商品有哪些字段
- 定义字段是否必填
- 定义字段校验规则

当前主要字段：

- `name`
- `description`
- `price`
- `category`
- `image`
- `isPublished`
- `createdAt`
- `updatedAt`

最关键的一句是：

```js
mongoose.model('Product', ProductSchema)
```

这里的模型名是 `Product`。

Mongoose 默认会把它映射成 MongoDB 集合名：

```text
products
```

所以你在 MongoDB Compass 里看到的是 `products`。

## 6. 数据库连接

连接配置文件：

- [\.env](D:/Xia/my/test/enterprise-website/.env)

当前内容：

```env
MONGODB_URI=mongodb://localhost:27017/enterprise
```

这串地址的含义：

- `localhost`
  表示连接本机数据库
- `27017`
  表示 MongoDB 默认端口
- `enterprise`
  表示数据库名

读取连接配置的代码在：

- [server/utils/db.js](D:/Xia/my/test/enterprise-website/server/utils/db.js)

所以 MongoDB Compass 里左侧看到的数据库名 `enterprise`，就是从这里来的，不是随便起的。

## 7. MongoDB 里实际存在哪

逻辑位置：

- 数据库：`enterprise`
- 集合：`products`

物理位置：

- [\.mongodb-data](D:/Xia/my/test/enterprise-website/.mongodb-data)

说明：

- `products` 不是一个单独的 json 文件
- MongoDB 会把数据存成自己的底层文件格式
- 所以你会看到 `collection-*.wt`、`index-*.wt`、`WiredTiger*` 这类文件

## 8. 如何确认商品真的入库了

有 3 种方法。

### 方法 1：用 MongoDB Compass

连接：

```text
mongodb://localhost:27017
```

然后展开：

```text
enterprise
  -> products
```

### 方法 2：看管理页

打开：

```text
/admin-products
```

这个页面读的是数据库真实数据。

### 方法 3：直接查数据库

例如按名称查：

```js
db.products.find({ name: '啊啊啊啊' })
```

## 9. 相关目录分别是什么

### `.mongodb-data`

作用：

- 存本地 MongoDB 的真实数据文件

注意：

- 删除后，本地数据库数据会丢失

### `.output`

作用：

- 存 Nuxt 生产构建结果

注意：

- 可以删除
- 删除后重新执行 `npm.cmd run build` 就会再生成

### `pages`

作用：

- 前端页面

### `server/api`

作用：

- 后端接口

### `server/models`

作用：

- Mongoose 数据模型

### `server/services`

作用：

- 封装数据库操作逻辑

## 10. 一句话理解

你在页面里新增商品时，并不是“页面直接写数据库”，而是：

1. 页面把数据发给后端接口
2. 后端接口调用 `mongoose`
3. `mongoose` 根据 `Product` 模型把数据写进 MongoDB
4. 最终落到数据库 `enterprise` 的 `products` 集合里

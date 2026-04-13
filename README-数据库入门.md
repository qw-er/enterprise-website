# 数据库入门说明

这份文档是给当前项目使用的，尽量用最简单的话说明数据库怎么理解。

## 1. 先记住 3 个词

### 数据库

可以理解成一个大文件柜。

当前项目的数据库名是：

```text
enterprise
```

### 集合

可以理解成文件柜里的一个抽屉。

当前商品数据放在：

```text
products
```

### 文档

可以理解成抽屉里的一张表单。

比如一个商品，就是一条文档：

```json
{
  "name": "啊啊啊啊",
  "description": "测试商品",
  "price": 1,
  "category": "222"
}
```

## 2. 当前项目的数据存在哪

逻辑上存这里：

- 数据库：`enterprise`
- 集合：`products`

连接地址在：

- [`.env`](D:/Xia/my/test/enterprise-website/.env)

当前值是：

```env
MONGODB_URI=mongodb://localhost:27017/enterprise
```

意思是：

- 用本机数据库
- 端口是 `27017`
- 数据库名叫 `enterprise`

## 3. 数据是怎么进去的

你在网页里新增商品时，流程是：

1. 打开商品页面
2. 填表单
3. 点“添加商品”
4. 前端把数据发给后端接口
5. 后端用 `mongoose` 写进 MongoDB

也就是说：

- 不是你手动去数据库里敲命令
- 而是页面帮你把数据发到数据库

## 4. 关键代码在哪

### 商品页面

- [pages/products.vue](D:/Xia/my/test/enterprise-website/pages/products.vue)

作用：

- 填写商品
- 提交商品

### 商品接口

- [server/api/products/index.post.js](D:/Xia/my/test/enterprise-website/server/api/products/index.post.js)

作用：

- 接收页面传来的数据

### 商品模型

- [server/models/Product.js](D:/Xia/my/test/enterprise-website/server/models/Product.js)

作用：

- 定义商品字段长什么样

## 5. 为什么 Compass 里会看到 enterprise 和 products

### enterprise 从哪来

来自 `.env`：

```env
mongodb://localhost:27017/enterprise
```

最后面的 `enterprise` 就是数据库名。

### products 从哪来

来自模型：

- [server/models/Product.js](D:/Xia/my/test/enterprise-website/server/models/Product.js)

里面有：

```js
mongoose.model('Product', ProductSchema)
```

`Product` 这个模型，Mongoose 默认会映射成集合名：

```text
products
```

## 6. 怎么看数据库里的真实数据

### 方法 1：MongoDB Compass

连接：

```text
mongodb://localhost:27017
```

然后点开：

```text
enterprise
  -> products
```

### 方法 2：项目管理页

打开：

```text
/admin-products
```

这个页面会显示数据库里的真实商品。

## 7. `.mongodb-data` 是什么

目录：

- [`.mongodb-data`](D:/Xia/my/test/enterprise-website/.mongodb-data)

作用：

- 存本地 MongoDB 真正的数据文件

可以理解成：

- `enterprise/products` 是“逻辑名字”
- `.mongodb-data` 是“这些数据实际存在硬盘哪里”

注意：

- 这个目录不要乱删
- 删了本地数据库数据就没了

## 8. `.output` 是什么

目录：

- [`.output`](D:/Xia/my/test/enterprise-website/.output)

作用：

- 存 Nuxt 打包后的文件

这个目录和数据库不是一回事。

它可以删，删了重新构建就会再生成。

## 9. 你现在最常用的操作

### 看商品是否入库

去：

```text
/admin-products
```

或者用 MongoDB Compass 看：

```text
enterprise -> products
```

### 新增商品

去：

```text
/products
```

填表单后提交。

### 初始化默认商品

执行：

```powershell
npm.cmd run seed:products
```

## 10. 一句话版本

这个项目里，商品数据最终存进了：

```text
本地 MongoDB -> 数据库 enterprise -> 集合 products
```

如果你后面忘了，就先看这份文档，再看根目录的：

- [DATABASE_FLOW.md](D:/Xia/my/test/enterprise-website/DATABASE_FLOW.md)

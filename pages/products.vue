<template>
  <div class="products-page">
    <header class="header">
      <h1>企业官网</h1>
      <nav class="nav">
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/products">商品列表</NuxtLink>
        <NuxtLink to="/contact">联系我们</NuxtLink>
      </nav>
    </header>

    <main class="main">
      <h1>商品列表</h1>

      <div class="add-product">
        <h2>添加新商品</h2>
        <form @submit.prevent="addProduct">
          <input v-model="newProduct.name" type="text" placeholder="商品名称" required>
          <input v-model="newProduct.description" type="text" placeholder="商品描述" required>
          <input v-model.number="newProduct.price" type="number" min="0" placeholder="价格" required>
          <input v-model="newProduct.category" type="text" placeholder="分类" required>
          <input v-model="newProduct.image" type="text" placeholder="图片 URL（可选）">
          <button type="submit">添加商品</button>
        </form>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="products-grid">
        <div v-for="product in products" :key="product._id" class="product-card">
          <div v-if="product.image" class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <p class="category">分类: {{ product.category }}</p>
            <p class="price">¥{{ product.price }}</p>
            <div class="actions">
              <button class="edit-btn" @click="editProduct(product)">编辑</button>
              <button class="delete-btn" @click="deleteProduct(product._id)">删除</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="editingProduct" class="modal">
        <div class="modal-content">
          <h2>编辑商品</h2>
          <form @submit.prevent="updateProduct">
            <input v-model="editingProduct.name" type="text" placeholder="商品名称" required>
            <input v-model="editingProduct.description" type="text" placeholder="商品描述" required>
            <input v-model.number="editingProduct.price" type="number" min="0" placeholder="价格" required>
            <input v-model="editingProduct.category" type="text" placeholder="分类" required>
            <input v-model="editingProduct.image" type="text" placeholder="图片 URL（可选）">
            <div class="modal-actions">
              <button type="submit">保存</button>
              <button type="button" @click="editingProduct = null">取消</button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>&copy; 2024 企业官网. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup>
const products = ref([])
const loading = ref(true)
const error = ref(null)
const newProduct = ref({
  name: '',
  description: '',
  price: 0,
  category: '',
  image: ''
})
const editingProduct = ref(null)

const getErrorMessage = (e, fallbackMessage) => {
  return e?.data?.statusMessage || e?.statusMessage || fallbackMessage
}

useHead({
  title: '商品列表 - 企业官网',
  meta: [
    { name: 'description', content: '浏览我们的优质商品列表' },
    { name: 'keywords', content: '商品,产品,企业商品' }
  ]
})

const fetchProducts = async () => {
  error.value = null

  try {
    products.value = await $fetch('/api/products')
  } catch (e) {
    error.value = getErrorMessage(e, '加载商品失败')
  } finally {
    loading.value = false
  }
}

const addProduct = async () => {
  error.value = null

  try {
    const response = await $fetch('/api/products', {
      method: 'POST',
      body: newProduct.value
    })

    products.value.unshift(response)
    newProduct.value = { name: '', description: '', price: 0, category: '', image: '' }
  } catch (e) {
    error.value = getErrorMessage(e, '添加商品失败')
  }
}

const editProduct = (product) => {
  error.value = null
  editingProduct.value = { ...product }
}

const updateProduct = async () => {
  error.value = null

  try {
    const response = await $fetch(`/api/products/${editingProduct.value._id}`, {
      method: 'PUT',
      body: editingProduct.value
    })

    const index = products.value.findIndex((product) => product._id === response._id)
    if (index !== -1) {
      products.value[index] = response
    }

    editingProduct.value = null
  } catch (e) {
    error.value = getErrorMessage(e, '更新商品失败')
  }
}

const deleteProduct = async (id) => {
  if (!confirm('确定要删除这个商品吗？')) return

  error.value = null

  try {
    await $fetch(`/api/products/${id}`, {
      method: 'DELETE'
    })

    products.value = products.value.filter((product) => product._id !== id)
  } catch (e) {
    error.value = getErrorMessage(e, '删除商品失败')
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.nav a:hover {
  opacity: 0.8;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.main h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.add-product {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.add-product h2 {
  margin-top: 0;
  color: #667eea;
}

.add-product form {
  display: grid;
  gap: 1rem;
}

.add-product input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.add-product button {
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.add-product button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.description {
  color: #666;
  margin: 0.5rem 0;
  line-height: 1.6;
}

.category {
  color: #999;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.price {
  color: #667eea;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
}

.actions {
  display: flex;
  gap: 1rem;
}

.actions button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.edit-btn {
  background: #3498db;
  color: white;
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.actions button:hover {
  opacity: 0.8;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
}

.modal-content h2 {
  margin-top: 0;
  color: #667eea;
}

.modal-content form {
  display: grid;
  gap: 1rem;
}

.modal-content input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.modal-actions button {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;
}

.modal-actions button:first-child {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-actions button:last-child {
  background: #95a5a6;
  color: white;
}

.modal-actions button:hover {
  opacity: 0.8;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

.footer p {
  margin: 0;
}
</style>

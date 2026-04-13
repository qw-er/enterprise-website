<template>
  <div class="admin-page">
    <header class="header">
      <div>
        <p class="eyebrow">Admin</p>
        <h1>商品管理</h1>
      </div>
      <div class="header-actions">
        <NuxtLink to="/products" class="link-btn">去商品页</NuxtLink>
        <button class="primary-btn" :disabled="loading" @click="fetchProducts">
          {{ loading ? '刷新中...' : '刷新数据' }}
        </button>
      </div>
    </header>

    <main class="main">
      <div class="summary-card">
        <p>当前数据库商品数</p>
        <strong>{{ products.length }}</strong>
      </div>

      <p v-if="message" class="message success">{{ message }}</p>
      <p v-if="error" class="message error">{{ error }}</p>

      <div class="table-wrap">
        <table v-if="products.length" class="table">
          <thead>
            <tr>
              <th>名称</th>
              <th>分类</th>
              <th>价格</th>
              <th>创建时间</th>
              <th>ID</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product._id">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>¥{{ product.price }}</td>
              <td>{{ formatDate(product.createdAt) }}</td>
              <td class="mono">{{ product._id }}</td>
              <td>
                <button class="danger-btn" @click="deleteProduct(product)">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="empty">
          目前数据库里还没有商品数据。
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const products = ref([])
const loading = ref(false)
const error = ref('')
const message = ref('')

useHead({
  title: '商品管理',
  meta: [
    { name: 'description', content: '查看数据库中的真实商品数据' }
  ]
})

const getErrorMessage = (e, fallbackMessage) => {
  return e?.data?.statusMessage || e?.statusMessage || fallbackMessage
}

const formatDate = (value) => {
  if (!value) return '-'

  return new Date(value).toLocaleString('zh-CN', {
    hour12: false
  })
}

const fetchProducts = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    products.value = await $fetch('/api/products')
  } catch (e) {
    error.value = getErrorMessage(e, '读取商品数据失败')
  } finally {
    loading.value = false
  }
}

const deleteProduct = async (product) => {
  if (!confirm(`确定删除商品“${product.name}”吗？`)) return

  error.value = ''
  message.value = ''

  try {
    await $fetch(`/api/products/${product._id}`, {
      method: 'DELETE'
    })

    products.value = products.value.filter((item) => item._id !== product._id)
    message.value = `已删除：${product.name}`
  } catch (e) {
    error.value = getErrorMessage(e, '删除商品失败')
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #f4f7fb;
  color: #162033;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  padding: 2rem;
  background: linear-gradient(135deg, #102542 0%, #1f4c7a 100%);
  color: #fff;
}

.eyebrow {
  margin: 0 0 0.4rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.8;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.summary-card {
  width: fit-content;
  min-width: 220px;
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(16, 37, 66, 0.08);
}

.summary-card p {
  margin: 0 0 0.5rem;
  color: #5f6f86;
}

.summary-card strong {
  font-size: 2rem;
}

.message {
  margin-top: 1rem;
  padding: 0.9rem 1rem;
  border-radius: 12px;
}

.success {
  background: #e7f7ed;
  color: #1e6b3a;
}

.error {
  background: #fdecec;
  color: #a12626;
}

.table-wrap {
  margin-top: 1.5rem;
  overflow-x: auto;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(16, 37, 66, 0.08);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e8edf5;
  vertical-align: top;
}

.table th {
  background: #f8fafc;
  color: #526279;
  font-size: 0.92rem;
}

.mono {
  font-family: Consolas, Monaco, monospace;
  font-size: 0.85rem;
}

.empty {
  padding: 2rem;
  color: #5f6f86;
}

.primary-btn,
.link-btn,
.danger-btn {
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.95rem;
  text-decoration: none;
}

.primary-btn {
  background: #f4b942;
  color: #162033;
}

.link-btn {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}

.danger-btn {
  background: #cb3a31;
  color: #fff;
}

.primary-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

@media (max-width: 768px) {
  .header {
    align-items: start;
    flex-direction: column;
  }

  .main {
    padding: 1rem;
  }
}
</style>

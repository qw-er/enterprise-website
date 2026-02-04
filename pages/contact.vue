<template>
  <div class="contact-page">
    <header class="header">
      <h1>企业官网</h1>
      <nav class="nav">
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/products">商品列表</NuxtLink>
        <NuxtLink to="/contact">联系我们</NuxtLink>
      </nav>
    </header>

    <main class="main">
      <h1>联系我们</h1>

      <div class="contact-container">
        <div class="contact-info">
          <h2>联系方式</h2>
          <div class="info-item">
            <strong>电话:</strong>
            <span>400-123-4567</span>
          </div>
          <div class="info-item">
            <strong>邮箱:</strong>
            <span>contact@enterprise.com</span>
          </div>
          <div class="info-item">
            <strong>地址:</strong>
            <span>北京市朝阳区某某街道123号</span>
          </div>
          <div class="info-item">
            <strong>工作时间:</strong>
            <span>周一至周五 9:00-18:00</span>
          </div>
        </div>

        <div class="contact-form">
          <h2>在线留言</h2>
          <form @submit.prevent="submitContact">
            <div class="form-group">
              <label for="name">姓名 *</label>
              <input
                id="name"
                v-model="contact.name"
                type="text"
                placeholder="请输入您的姓名"
                required
              >
            </div>
            <div class="form-group">
              <label for="email">邮箱 *</label>
              <input
                id="email"
                v-model="contact.email"
                type="email"
                placeholder="请输入您的邮箱"
                required
              >
            </div>
            <div class="form-group">
              <label for="phone">电话 *</label>
              <input
                id="phone"
                v-model="contact.phone"
                type="tel"
                placeholder="请输入您的电话"
                required
              >
            </div>
            <div class="form-group">
              <label for="message">留言内容 *</label>
              <textarea
                id="message"
                v-model="contact.message"
                placeholder="请输入您的留言内容"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" :disabled="submitting">
              {{ submitting ? '提交中...' : '提交留言' }}
            </button>
          </form>
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>&copy; 2024 企业官网. 保留所有权利.</p>
    </footer>
  </div>
</template>

<script setup>
const contact = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

useHead({
  title: '联系我们 - 企业官网',
  meta: [
    { name: 'description', content: '联系我们，获取更多产品信息和服务支持' },
    { name: 'keywords', content: '联系我们,联系方式,在线留言,客服' }
  ]
})

const submitContact = async () => {
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await $fetch('/api/contacts', {
      method: 'POST',
      body: contact.value
    })
    successMessage.value = '留言提交成功！我们会尽快与您联系。'
    contact.value = { name: '', email: '', phone: '', message: '' }
  } catch (e) {
    errorMessage.value = '提交失败，请稍后重试。'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
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

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

.contact-info {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-info h2 {
  margin-top: 0;
  color: #667eea;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item strong {
  color: #333;
  font-weight: 600;
}

.info-item span {
  color: #666;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  margin-top: 0;
  color: #667eea;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.contact-form button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s;
}

.contact-form button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.contact-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 5px;
  text-align: center;
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: 5px;
  text-align: center;
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

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
  }

  .nav {
    gap: 1rem;
  }
}
</style>

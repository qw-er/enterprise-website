<template>
  <div class="home">
    <header class="header">
      <h1>企业官网</h1>
      <nav class="nav">
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/products">商品列表</NuxtLink>
        <NuxtLink to="/contact">联系我们</NuxtLink>
      </nav>
    </header>

    <main class="main">
      <section class="hero">
        <h2>为客户提供优质厂家商品</h2>
        <p>我们致力于为客户提供最优质的产品和服务</p>
        <NuxtLink to="/products" class="btn">查看商品</NuxtLink>
      </section>

      <section class="features">
        <div class="feature">
          <h3>优质产品</h3>
          <p>精选厂家直供，品质保证</p>
        </div>
        <div class="feature">
          <h3>专业服务</h3>
          <p>一对一专业咨询，贴心服务</p>
        </div>
        <div class="feature">
          <h3>快速响应</h3>
          <p>快速处理订单，及时发货</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2024 企业官网. 保留所有权利.</p>
    </footer>
  </div>
</template>

<style scoped>
.home {
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

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  margin-bottom: 3rem;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.feature h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.feature p {
  color: #666;
  line-height: 1.6;
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

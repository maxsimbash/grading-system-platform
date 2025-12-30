# Vercel 部署指南

## 项目已准备就绪！

您的项目已经推送到 GitHub，现在可以部署到 Vercel 了。

**GitHub 仓库地址**: https://github.com/maxsimbash/grading-system-platform

---

## 🚀 部署步骤（5分钟完成）

### 第一步：访问 Vercel
1. 打开浏览器，访问 [https://vercel.com](https://vercel.com)
2. 点击右上角 **"Sign Up"** 或 **"Log In"**
3. 选择 **"Continue with GitHub"** 使用 GitHub 账号登录

### 第二步：导入项目
1. 登录后，点击 **"Add New..."** → **"Project"**
2. 在 **"Import Git Repository"** 页面，找到 **`maxsimbash/grading-system-platform`**
3. 点击 **"Import"** 按钮

### 第三步：配置项目（使用默认设置即可）
Vercel 会自动检测到这是一个 Vite 项目，配置如下：

- **Framework Preset**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

**无需修改任何配置**，直接点击 **"Deploy"** 按钮。

### 第四步：等待部署完成
- 部署过程大约需要 1-2 分钟
- 您会看到构建日志滚动显示
- 部署成功后，会显示 🎉 **Congratulations!** 页面

### 第五步：获取公开链接
部署成功后，您会获得一个公开访问链接，格式如：

```
https://grading-system-platform.vercel.app
```

或者

```
https://grading-system-platform-xxx.vercel.app
```

**这个链接可以直接分享给任何人！**

---

## ✅ 部署后的优势

- ✅ **永久在线**：7×24小时稳定访问
- ✅ **全球 CDN**：访问速度快
- ✅ **自动 HTTPS**：安全加密
- ✅ **免费托管**：无需付费
- ✅ **自动部署**：推送代码到 GitHub 后自动更新

---

## 🔧 绑定自定义域名（可选）

如果您有自己的域名（如 `grading.example.com`），可以在 Vercel 项目设置中绑定：

1. 进入项目的 **Settings** → **Domains**
2. 输入您的域名
3. 按照提示添加 DNS 记录
4. 等待 DNS 生效（通常几分钟）

---

## 📝 更新网站内容

如果您需要修改网站内容：

1. 修改本地代码
2. 提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "更新内容"
   git push
   ```
3. Vercel 会自动检测到更新并重新部署

---

## 🆘 需要帮助？

如果部署过程中遇到问题：

1. 检查 Vercel 的构建日志（Build Logs）
2. 确认 GitHub 仓库权限已授权给 Vercel
3. 查看 Vercel 官方文档：https://vercel.com/docs

---

## 🎯 下一步

部署成功后，您可以：

1. **分享链接**：将 Vercel 提供的链接分享给家长、老师、同事
2. **添加到收藏**：在浏览器中收藏您的网站
3. **社交媒体分享**：在微信、朋友圈、微博等平台分享
4. **嵌入网站**：如果您有自己的网站，可以通过 iframe 嵌入

---

**祝您部署顺利！🎉**

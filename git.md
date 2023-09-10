git的基础命令语句
git -- version  查看当前git的版本
生成并配置公钥：ssh -t git@gitee.com
生成后的公钥在c盘里.ssh文件
git 使用前配置
1,提交人姓名 git config -- global user.name 姓名
2. git config -- global user.email 邮箱
3.查看git配置信息 git config --list
提交步骤
1. git init 初始化仓库
2.git status 查看文件状态
3.git add 文件列表 追踪文件
4.git commit -m 提交信息 向仓库提交代码
5.git log 查看提交记录
回复记录
git rest --hard commitID
git status   查看文件状态
git add .     把所有文件添加到内存中
git checkout -b  创建新分支
git branch   切换分支
git remote add origin https  创建别名
git push -u origin  master 推送到origin
git commit -m 提交分支
git merge 合并分支


vue create 与 vue init 的区别 
1. vue create
是vue-cli3.x的初始化方式，目前模板是固定的，模板选项可自由配置，创建出来的是vue-cli3的项目，与cue-cli2项目结构不同，配置方法不同，具体配置方法参考官方文档。
使用方式：vue create 项目名称

2. vue init
vue init 是vue-cli2.x的初始化方式，可以使用github上面的一些模板来初始化项目，webpack是官方推荐的标准模板名。vue-cli2.x项目向3.x迁移只需要把static目录复制到public目录下，老项目的src目录覆盖3.x的src目录(如果修改了配置，可以查看文档，用cli3的方法进行配置)
2.1 webpack是官方推荐的标准模板名
使用方式：
vue init webpack 项目名称  创建webpack的vue2项目
vue init vue@latest       创建vite的vue3项目


npm create vite@latest 和 npm init vue@latest 是针对不同的项目模板进行初始化的命令，具有以下区别：
1.npm create vite@latest：
         使用 Vite 构建工具创建项目模板。
        Vite 是一个现代化的前端构建工具，用于快速搭建现代化的 Vue、React 或者原生 JavaScript 项目。
        通过该命令创建的项目模板具有现代化的构建特性，如快速的热模块替换、即时的开发服务器、基于 ES 模块的构建等，能够提供更快的开发和构建速度。

2.npm init vue@latest：
        使用 Vue CLI 创建项目模板。
        Vue CLI 是一个官方提供的用于快速搭建 Vue 项目的脚手架工具。
        通过该命令创建的项目模板集成了 Vue 相关的生态系统和最佳实践，包括路由、状态管理、打包配置等。
        Vue CLI 提供了更多的选项和配置，适用于更复杂的 Vue 项目需求。

总结：

        如果你需要构建一个 Vue 项目，并且需要使用 Vue 生命周期、Vue Router、Vuex 等 Vue 生态的全套功能，以及一些预定义的配置和插件，可以选择使用 npm init vue@latest。
        如果你希望创建的项目是一个现代化的、轻量级的项目，不依赖传统的打包工具如 webpack，而且希望享受到 Vite 的极速开发体验，可以选择使用 npm create vite@latest。
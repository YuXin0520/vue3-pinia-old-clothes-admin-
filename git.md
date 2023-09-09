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
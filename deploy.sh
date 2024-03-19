rm -rf imageBed

mkdir imageBed

cp -rf dist/*  imageBed/

cp -rf dist/imageBed/*  imageBed/

rm -rf imageBed/imageBed


# 防止不更新
ssh root@43.139.47.204 "rm -rf /www/server/web/imageBed/*"

scp -P 22 -r imageBed/* root@43.139.47.204:/www/server/web/imageBed/




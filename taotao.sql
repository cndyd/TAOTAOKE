SET NAMES UTF8;
DROP DATABASE IF EXISTS taotao;
CREATE DATABASE taotao CHARSET=UTF8;
USE taotao;


/*主页轮播图片表*/
CREATE TABLE home_lunbo(
  lbid INT PRIMARY KEY AUTO_INCREMENT,
  lbimg VARCHAR(200) /*轮播图片*/
);
/*轮播图片表插入*/
INSERT INTO home_lunbo VALUES
(NULL,'img/lun1.jpg'),
(NULL,'img/lun2.jpg'),
(NULL,'img/lun3.jpg'),
(NULL,'img/lun4.jpg'),
(NULL,'img/lun5.jpg');

/*主页分组表*/
CREATE TABLE home_fenzu(
  fzid INT PRIMARY KEY AUTO_INCREMENT,
  fzimg VARCHAR(200), /*分组图片*/
  fzurl VARCHAR(100), /*分组url*/
  fztext VARCHAR(12) /*分组名称*/
);
/*主页分组表插入*/
INSERT INTO home_fenzu VALUES
(NULL,'img/fz1.png','/','主页'),
(NULL,'img/fz2.png','/','男装'),
(NULL,'img/fz3.png','/','女装'),
(NULL,'img/fz4.png','/','婴儿'),
(NULL,'img/fz5.png','/','生活用品'),
(NULL,'img/fz6.png','/','手机'),
(NULL,'img/fz7.png','/','电脑'),
(NULL,'img/fz8.png','/','家电'),
(NULL,'img/fz9.png','/','水果'),
(NULL,'img/fz10.png','/','杂货');

/*主页热卖栏*/
CREATE TABLE home_remai(
  rmid INT PRIMARY KEY AUTO_INCREMENT,
  rmname VARCHAR(12), /*热卖名称*/
  rmurl VARCHAR(200), /*热卖url*/
  rmimg VARCHAR(200), /*热卖图片单*/
  rmimage VARCHAR(200) /*分组图片双*/
);
/*主页热卖栏表插入*/
INSERT INTO home_remai VALUES
(NULL,'当前热卖','/','img/wupin1.jpg','img/wupin2.jpg'),
(NULL,'限时抢购','/','img/wupin3.jpg','img/wupin4.jpg'),
(NULL,'最大折扣','/','img/wupin5.png','img/wupin6.jpg'),
(NULL,'必买清单','/','img/wupin7.png','img/wupin8.jpg');

/*主页每日热卖*/
CREATE TABLE home_meiri(
  mrid INT PRIMARY KEY AUTO_INCREMENT,
  mrurl VARCHAR(200), /*热卖url*/
  mrtitle VARCHAR(12), /*热卖标题*/
  mrtext VARCHAR(12), /*热卖文字*/
  mrimg VARCHAR(200) /*热卖图片单*/
);
/*主页每日热卖表插入*/
INSERT INTO home_meiri VALUES
(NULL,'/','淘淘星球','分期免息','img/meiri1.jpg'),
(NULL,'/','名牌秒杀','低价抢大牌','img/meiri2.jpg'),
(NULL,'/','秒购','限时秒杀','img/meiri3.jpg'),
(NULL,'/','网红好货','发现新生活','img/meiri4.jpg'),
(NULL,'/','会员专卖','好礼送不停','img/meiri5.jpg'),
(NULL,'/','新品首发','授权专卖','img/meiri6.jpg'),
(NULL,'/','排行榜','当季最热','img/meiri7.jpg'),
(NULL,'/','二手拍拍','全部5折起','img/meiri8.jpg');

/*主页展览*/
CREATE TABLE home_zhanlan(
  zlid INT PRIMARY KEY AUTO_INCREMENT,
  zlurl VARCHAR(200), /*展览1url*/
  zlimg VARCHAR(200), /*展览1图片*/
  zlurls VARCHAR(200), /*展览2url*/
  zlimgs VARCHAR(200), /*展览2图片*/
  zltitle VARCHAR(200) /*展览标题图片*/
);
/*主页每日热卖表插入*/
INSERT INTO home_zhanlan VALUES
(NULL,'/','img/zhanlan1.jpg','/','img/zhanlan1s.jpg','img/zhanlanBT1.png'),
(NULL,'/','img/zhanlan2.jpg','/','img/zhanlan2s.jpg','img/zhanlanBT2.png'),
(NULL,'/','img/zhanlan3.jpg','/','img/zhanlan3s.jpg','img/zhanlanBT3.png');

/*推荐区*/
CREATE TABLE home_tuijian(
  tjid INT PRIMARY KEY AUTO_INCREMENT,
  tjurl VARCHAR(200), /*推荐url*/
  tjimg VARCHAR(200), /*推荐图片*/
  tjtitle VARCHAR(30), /*推荐标题*/
  tjprice DECIMAL(10,2) NOT NULL, /*推荐价格*/
  tjpeople VARCHAR(200) /*推荐购买人数*/
);
/*主页推荐区表插入*/
INSERT INTO home_tuijian VALUES
(NULL,'/','img/tuijian1.jpg','睡衣女夏季短袖棉质睡裙可爱卡通休闲小清新家居服 小丸子裙 M','39.00','124'),
(NULL,'/','img/tuijian2.jpg','新款包斜跨仙女可爱迷你毛毛链条小包包女2018新款单肩斜挎包 黑色','88.80','55'),
(NULL,'/','img/tuijian3.jpg','向右围太阳镜女2018新款潮网红同款眼镜偏光墨镜女韩版个性复古原宿风 黑色 全智贤黑框灰片','99.00','108'),
(NULL,'/','img/tuijian4.jpg','厨房置物架多层落地卫生间浴室厕所洗漱台三角架收纳架子洗手间脸盆架','10.00','622'),
(NULL,'/','img/tuijian5.jpg','明美娜（MINGMEINA）2019春夏新款旅游鞋百搭厚底轻便ins韩版平底小白鞋女休闲运动鞋','89.90','77'),
(NULL,'/','img/tuijian6.jpg','酷尚叔叔鸟牛仔外套男春装新款牛仔破洞拼接帅气牛仔风衣小外套夹克','205.00','1056'),
(NULL,'/','img/tuijian7.jpg','不锈钢车载保温杯车家用便携水杯汽车用品茶杯创意车载加厚自驾游装备 颜色随机款','59.00','49'),
(NULL,'/','img/tuijian8.jpg','珊瑚绒毯子毛巾小被子加绒垫床单单人空调毯办公室午睡法兰绒毛毯 加密加厚亲肤透气 多色随机发货','156.00','705');


/*创建购物车表*/
CREATE TABLE taotao_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  tjid VARCHAR(999),
  limg VARCHAR(200),
  lname VARCHAR(99),
  price DECIMAL(10,2),
  count INT,
  uid   INT
);



/*商品分类*/
CREATE TABLE fenlei_remen(
  id INT PRIMARY KEY AUTO_INCREMENT,
  rmurl VARCHAR(200),
  rmimg VARCHAR(200),
  rmtitle VARCHAR(25)
);

INSERT INTO fenlei_remen VALUES
(null,'/Commodity','img/fenlei/shouji.png','手机'),
(null,'/Commodity','img/fenlei/erji.png','耳机'),
(null,'/Commodity','img/fenlei/chuifengji.png','吹风机'),
(null,'/Commodity','img/fenlei/kouhong.png','口红'),
(null,'/Commodity','img/fenlei/diancilu.png','电磁炉'),
(null,'/Commodity','img/fenlei/nvxie.jpg','女鞋'),
(null,'/Commodity','img/fenlei/qunzi.jpg','裙子'),
(null,'/Commodity','img/fenlei/lingshi.png','零食'),
(null,'/Commodity','img/fenlei/shuibei.png','水杯'),
(null,'/Commodity','img/fenlei/xifashui.png','洗发水'),
(null,'/Commodity','img/fenlei/xiyiye.png','洗衣液');


/*创建用户信息表*/
CREATE TABLE taotao_login(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25),
  upwd VARCHAR(32),
  phone VARCHAR(11)
);
/*2:添加二条测试数据*/
INSERT INTO taotao_login VALUES
(NULL,"long",md5('123456'),'13523411193'),
(NULL,"tom",md5('123456'),'13511111111');


//app.js
//1:复制服务器端模块
//2:引入第三方模块
//  mysql/express/
const mysql = require("mysql");
const express = require("express");
//3.3配置一个第三方中间件
const bodyParser=require("body-parser");



//3:创建连接池
const pool = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"taotao"
});

//4:创建express对象
var server = express(); 
//3.4配置json是否自动转换
server.use(bodyParser.urlencoded({extended:false}))
//app.js 录一段跨域配置
const cors = require("cors");
server.use(cors({
   origin:["http://127.0.0.1:8080",
   "http://localhost:8080"],
   credentials:true
}))

//加载模块 express-session
const session = require("express-session");
server.use(session({
  secret:"128位随机字符串",
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:1000*60*60
  }
}))
//5:绑定监听端口 3000
server.listen(3000);
//5.1:指定静态目录.保存图片资源
//    项目中所有图片都需要保存在服务器端
//    重启动服务器 
server.use(express.static("public"));

//首页轮播图
server.get('/lunbo',(req,res)=>{
  var sql="select * from home_lunbo";
  pool.query(sql, (err, result) => {
    // console.log(result)
    if(err)throw err;
    res.send(result);
  });
});

//首页分组
server.get('/fenzu',(req,res)=>{
  var sql="select * from home_fenzu";
  pool.query(sql, (err, result) => {
    // console.log(result)
    if(err)throw err;
    res.send(result);
  });
});

//首页热卖栏
server.get('/remai',(req,res)=>{
  var sql="select * from home_remai";
  pool.query(sql, (err, result) => {
    // console.log(result)
    if(err)throw err;
    res.send(result);
  });
});

//首页每日
server.get('/meiri',(req,res)=>{
  var sql="select * from home_meiri";
  pool.query(sql, (err, result) => {
    // console.log(result)
    if(err)throw err;
    res.send(result);
  });
});

//首页展览
server.get('/zhanlan',(req,res)=>{
  var sql="select * from home_zhanlan";
  pool.query(sql, (err, result) => {
    // console.log(result)
    if(err)throw err;
    res.send(result);
  });
});

//分类-热门
server.get('/remen',(req,res)=>{
  var sql="select * from fenlei_remen";
  pool.query(sql, (err, result) => {
    // console.log(result)
    if(err)throw err;
    res.send(result);
  });
});

//推荐

server.get("/tuijian", (req, res) => {
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  if (!pno) {
    pno = 1;
  }
  if (!pageSize) {
    pageSize = 4;
  }
  var obj = { code: 1 };
  var progress = 0;
  //2:创建一条sql语句
  var sql = "SELECT tjid,tjurl,tjimg,tjtitle,tjprice,tjpeople FROM home_tuijian LIMIT ?,?";
  //2.1:创建一个变量offset 起始行数
  var offset = (pno - 1) * pageSize;
  //2.2:创建一个变量ps     一页数据
  var ps = parseInt(pageSize);
  //3:执行sql语句
  pool.query(sql, [offset, ps], (err, result) => {
    if (err) throw err;
    progress += 50;
    obj.data = result;
    //4:获取数据库返回结果
    //5:发送数据+不再发送数据
    //res.send({code:1,data:result});
    if (progress == 100) {
      res.send(obj);
    }
  })
  //6:计算总页数
  //6.1:创建sql查询总记录数
  var sql = " SELECT count(tjid) AS c FROM";
  sql += " home_tuijian";
  pool.query(sql, (err, result) => {
    //result [{id:1,name:"tom"},{id:2}]
    //result [{c:11}]
    //result[0].c
    if (err) throw err;
    progress += 50;
    var pc = Math.ceil(result[0].c / pageSize);
    obj.pageCount = pc;
    if (progress == 100) {
      res.send(obj)
    }
  })
});

//7.模糊查询
server.get('/search', (req, res) => {
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  if (!pno) { pno = 1 }
  if (!pageSize) { pageSize = 6 }
  var title = req.query.tjtitle;
  var sql = "SELECT tjid,tjurl,tjimg,tjtitle,tjprice,tjpeople FROM home_tuijian WHERE tjtitle LIKE concat('%',?,'%') LIMIT ?,?";
  var offset = (pno - 1) * pageSize;
  pageSize = parseInt(pageSize);
  pool.query(sql, [title, offset, pageSize], (err, result) => {
    if (err) throw err;
    res.send({ code: 1, data: result });
  })
});

//8.详情页
server.get('/xiangqing',(req,res)=>{
  var tjid=req.query.tjid;
  var sql="select tjid,tjimg,tjtitle,tjprice,tjpeople from home_tuijian where tjid=?";
  pool.query(sql,[tjid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result})
  })
})

//购物车列表
server.get("/getCart",(req,res)=>{
  //1:参数 uid 当前登录用户编号
  // var uid = 2;
  var uid = req.session.uid;
  //2:sql
  var sql = "SELECT id,limg,lname,price,count";
  sql+=" FROM taotao_cart";
  sql+=" WHERE uid = ?"
  //3:json
  pool.query(sql,[uid],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result})
  });
});

//商品加入购物车
server.get('/addcart',(req,res)=>{
  var uid=req.session.uid;
  // console.log(uid);
  var tjid=req.query.tjid;
  var lname=req.query.tjtitle;
  var price=req.query.tjprice;
  var limg=req.query.tjimg;
  //查询当前用户是否添加过此商品
  var sql = "select id from taotao_cart where uid=? and tjid=?";
  console.log(uid,tjid,lname,price,limg,sql);
  pool.query(sql,[uid,tjid],(err,result)=>{
    if(err)throw err;
    if(result.length==0){
      //如果没有查询结果添加此商品
      var sql=`insert into taotao_cart values(null,'${tjid}','${limg}','${lname}','${price}',1,'${uid}')`;
    }else{
      //创建sql语句如果有结果更新数量
      var sql=`update taotao_cart set count=count+1 where uid=${uid} and tjid=${tjid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      res.send({code:1,msg:"添加成功"})
    })
  })
})

//删除购物车指定商品信息
server.get("/removeCartItem",(req,res)=>{
  //1:参数
  var id = req.query.id;
  //2:sql
  var sql = "DELETE FROM taotao_cart WHERE id=?";
  pool.query(sql,[id],(err,result)=>{
     if(err)throw err;
     if(result.affectedRows==0){
       res.send({code:-1,msg:"删除失败"});
     }else{
       res.send({code:1,msg:"删除成功"});
     }
  });
  //3:json
});


//删除购物车中多个商品
  server.get("/delM", (req, res) => {
    //1:参数  19
    var ids = req.query.ids;
    //2:sql
    var sql = "DELETE FROM taotao_cart WHERE id IN (" + ids + ")";
    pool.query(sql, (err, result) => {
      if (err) throw err;
      if (result.affectedRows == 0) {
        res.send({ code: -1, msg: "删除失败" })
      } else {
        res.send({ code: 1, msg: "删除成功" })
      }
    })
    //3:json
  });

//6:处理用户登录请求
  //login GET
  server.get("/login", (req, res) => {
    //6.1:获取参数
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    //6.2:创sql
    var sql = "SELECT * FROM taotao_login";
    sql += " WHERE uname = ? AND upwd=md5(?)";
    //6.3:执行sql
    pool.query(sql, [uname, upwd], (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res.send({ code: -1, msg: "用户名或密码有误" });
      } else {
        var uid=result[0].uid;
        //保存session对象中
        // console.log(result[0].uid);
        req.session.uid = uid;
        res.send({code:1,msg:"登录成功"});
      }
    });
  });

//7.注册
server.post('/zhuce', (req, res) => {
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  var phone = req.body.phone;
  var sql = "insert into taotao_login values(null,?,md5(?),?)";
  pool.query(sql, [uname, upwd, phone], (err, result) => {
    if (err) throw err;
    res.send({ code: 1, msg: "添加成功" })
  });
});

//1查看用户名
server.get('/use',(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
  }
  var sql="select uname from taotao_login where uid=?";
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result});
  })
})

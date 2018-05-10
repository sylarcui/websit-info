// 引入mockjs
import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const produceNewsData = () => {
  let articles = []
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/mock/v1/news/index', 'post', produceNewsData)

const templateList = () => {
  let articles = []
  let templateTit = ['落户申请', '一卡通申请', '入库审批', '请假审批', '多胎申请', '住房公积金贷款申请', '迁入单位集体户', '被人民法院宣告失踪注销户口', '出具纳税证明']
  for (let i = 0; i < templateTit.length; i++) {
    let newArticleObject = {
      id: i,
      title: templateTit[i],
      thumbnail_pic_s: '/static/webform-1.png' // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/mock/v1/templateList', 'post', templateList)

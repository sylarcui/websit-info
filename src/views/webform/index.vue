<template>
  <el-container class="webform-create">
    <el-main>
      <el-row class="header">
        <el-col :span="12"><icon :icon="['fal', 'file-plus']" fixed-width></icon> 新建</el-col>
        <el-col :span="12" class="text-right">
          <el-input
            class="template-search"
            size="mini"
            placeholder="模版搜索"
            v-model="templateSearch">
            <el-button slot="append" icon="el-icon-search"  type="primary"></el-button>
          </el-input>
          <el-button size="mini" type="primary"><icon :icon="['fal', 'folder-open']" fixed-width></icon> 打开</el-button>
        </el-col>
      </el-row>
      <ul class="template-list">
        <li class="template-item">
          <div class="template-item-img"></div>
          <span class="template-item-name">空白</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">落户申请</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">一卡通申请</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">入库审批</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">请假审批</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">多胎申请</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">住房公积金贷款申请</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">迁入单位集体户</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">被人民法院宣告失踪注销户口</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">出具纳税证明</span>
        </li>
      </ul>
      <el-row class="header">
        <el-col :span="12"><icon :icon="['fal', 'folder']" fixed-width></icon> 最近打开的...</el-col>
      </el-row>
      <ul class="template-list">
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">落户申请</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">一卡通申请</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">入库审批</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">请假审批</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">多胎申请</span>
        </li>
        <li class="template-item">
          <div class="template-item-img">
            <img src="../../assets/images/webform-1.png">
          </div>
          <span class="template-item-name">住房公积金贷款申请</span>
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      templateSearch: ''
    }
  }
}
</script>

<style scoped lang="scss">
  .webform-create {
    background-color: #F5F5F5;
    .header {
      height: rem(40);
      border-bottom: rem(1) rgba(151, 151, 151, 0.25) solid;
      padding: rem(5);
      line-height: rem(30);
      font-size: rem(12);
      svg {
        font-size: rem(14);
      }
      .template-search {
        width: rem(300);
      }
    }
    .template-list {
      padding: rem(30);
      .template-item {
        cursor: pointer;
        width: rem(180);
        height: rem(250);
        text-align: center;
        display: inline-block;
        margin: rem(15);
        .template-item-img {
          display: inline-block;
          background-color: white;
          height: rem(200);
          width: rem(150);
          overflow: hidden;
          border: rem(1) solid rgba(0,0,0,0.1);
          text-align: center;
          img {
            max-width: 100%;
          }
          &:hover {
            border: rem(1) solid #253245;
          }
        }
        .template-item-name {
          line-height: rem(50);
          font-size: rem(12);
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          display: block;
        }
      }
    }
  }

</style>

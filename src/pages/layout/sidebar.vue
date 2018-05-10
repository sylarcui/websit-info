<template>
  <el-aside width="90px" class="sidebar-menu">
    <div class="avatar">
      <el-popover
        placement="right"
        width="200"
        trigger="hover">
        <div>
          用户名：崔晋
        </div>
        <img src="../../assets/avatar.jpg"  slot="reference"/>
      </el-popover>
    </div>
    <div class="me-name">崔晋</div>
    <ul class="menu-list">
      <router-link to="/message" tag='li' class='menu-item'>
        <el-badge :value="100" :max="10" class="item" >
          <icon :icon="['fas', 'comments']" size="3x" fixed-width></icon>
          <br/>
          交流
        </el-badge>
      </router-link>
      <router-link to="/webform" tag='li' class='menu-item' >
        <icon :icon="['fab', 'wpforms']" size="3x" fixed-width></icon>
        <br/>
        表单
      </router-link>
      <router-link to="/bpmn" tag='li' class='menu-item'>
        <icon :icon="['far', 'code-branch']" size="3x" fixed-width></icon>
        <br/>
        流程
      </router-link>
      <router-link to="/website" tag='li' class='menu-item'>
        <icon :icon="['fal', 'browser']" size="3x" fixed-width></icon>
        <br/>
        平台
      </router-link>
    </ul>
    <div class="set-up">
      <icon :icon="['far', 'cog']"></icon>
      <div class="version">
        v0.0.1
      </div>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped lang="scss">
.sidebar-menu {
  background-color: #253245;
  text-align: center;
  width: rem(90);
  color: $white;
  font-size: rem(12);
  padding-top: rem(20);
  position: relative;
  .avatar {
    width: rem(60);
    height: rem(60);
    margin: 0 auto;
    border-radius: rem(3);
    overflow: hidden;
    margin-top: rem(15);
    img {
      width: 100%;
    }
  }
  .me-name {
    padding: rem(15) rem(5);
    vertical-align: middle;
  }
  .menu-list {
    padding-bottom: rem(50);
    .menu-item {
      cursor: pointer;
      border-top: 1px solid #0D1D33;
      padding: rem(10) rem(10);
      line-height: rem(25);
      &:nth-last-child(1) {
        border-bottom: 1px solid #0D1D33;
      }
      &.router-link-exact-active,&:hover {
        background-color: #34445D;
      }
      .el-badge .el-badge__content.is-fixed {
        right: rem(20) !important;
      }
    }
  }
  .set-up {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: rem(50);
    padding: rem(10) 0;
    font-size: rem(14);
    .version {
      color: rgba(255,255,255,0.8);
      font-size: rem(5);
      line-height: rem(20);
    }
  }
}
</style>
<style lang="scss">
  .menu-item {
    .el-badge__content {
      padding: 0 rem(3);
      height: 16px;
      line-height: 16px;
      top: rem(3);
    }
    .el-badge .el-badge__content.is-fixed {
      right: rem(20) !important;
    }
  }
</style>

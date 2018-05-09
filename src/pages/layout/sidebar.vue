<template>
  <el-aside width="90px" class="sidebar-menu">
    <div class="avatar"><img src="../../assets/avatar.jpg"/> </div>
    <div class="me-name">崔晋</div>
    <i class="user" ></i>
    <i class="twitter" ></i>
    <i class="book-fas" ></i>
    <i class="book-far" ></i>
    <i class="book-fal" ></i>
    <i class="book-fab" ></i>
    <font-awesome-icon icon="sign-out" size="2x"></font-awesome-icon>
    <router-link to="/message" tag='li' class='menu-item'>
      交流
    </router-link>
    <router-link to="/webform" tag='li' class='menu-item'>
      表单
    </router-link>
    <router-link to="/bpmn" tag='li' class='menu-item'>
      流程
    </router-link>
    <router-link to="/website" tag='li' class='menu-item'>
      平台
    </router-link>
  </el-aside>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped lang="scss">
.sidebar-menu {
  i {
    font-size: 50px;
  }
  background-color: #253245;
  text-align: center;
  width: rem(90);
  color: $white;
  padding-top: rem(20);
  .avatar {
    width: rem(60);
    height: rem(60);
    margin: 0 auto;
    border-radius: rem(3);
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .me-name {
    padding: rem(10) rem(5);
    font-size: rem(12);
  }
}
</style>

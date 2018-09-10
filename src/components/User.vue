<template lang="pug">
  
  el-container(direction='vertical') 
    el-row(type="flex" class="row-bg" justify="center")
      el-col(:span='16')
        router-link(
          to='/' 
          @click.native='logout'
          class='logout-link') Logout
          
        el-table(
          :data="usersList.slice(range.start, range.end)"
          style="width: 100%")
          el-table-column(
            prop="name"
            label="Name")
          el-table-column(
            prop="contact.email"
            label="Email")
          el-table-column(
            label="Phone Number")
            template(slot-scope="scope") -
          el-table-column(
            prop="contact.countryCode"
            label="Country Code")
          el-table-column(
            prop="members[0].organization.name"
            label="Organization")
          el-table-column(
            label="Ban Expiry Date")
            template(slot-scope="scope") -
          el-table-column(
            prop="createdAt"
            label="Created At")

        el-pagination(
          layout="prev, pager, next"
          :total="20"
          @current-change='changePaginationPage')

</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState([
      'usersList'
    ])
  },
  data() {
    return {
      range: {
        start: 0, 
        end: 10
      }
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('AUTH_LOGOUT')
    },
    changePaginationPage(currentPage) {
      if (currentPage === 1) {
        this.range.start = 0;
        this.range.end = 10;
      } else if (currentPage === 2) {
        this.range.start = 11;
        this.range.end = 20;
      }
    }
  }
}
</script>

<style lang="sass">

  .logout-link
    display: flex
    color: #000 
    margin-top: 50px
    margin-bottom: 40px

  .el-pagination
    display: flex
    justify-content: center
    margin: 30px 0 50px
    button
      background: red
    ul
      li
        background: none

  .el-pagination .btn-next, 
  .el-pagination .btn-prev
    background: none
    &:disabled
      background: none

  .el-table__row
    td
      &:nth-child(3),
      &:nth-child(6)
        text-align: center

</style>

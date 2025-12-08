<script>


export default {
  data() {
    return {
      n_user: this.n_user_p ? this.n_user_p : "Gok"
    }
  },
  props: ["n_user_p"]
    // : {
    //   type: "String"
    // }
  // }
  ,
  methods: {
    calc() {
      return 1 + 2
    }
  },
  computed: {
    concatValue() {
      return this.n_user + "_value_" + this.calc()
    }
  }
}

</script>

<template>

  <p>
    Hello {{ n_user }}
  </p>

  <p>What is 1 + 2 ?</p>
  <p>It is {{ calc() }}</p>

  <p>Computed value is:</p>
  <p>{{ concatValue }}</p>
</template>

<style scoped>

</style>
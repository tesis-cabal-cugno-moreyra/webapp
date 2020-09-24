<template>
  <div></div>
</template>
<script>
export default {
  name: "Home",
  created() {
    this.$store.dispatch("uiParams/showNavBar");
  }
};
</script>

<template>
  <div></div>
</template>
<script>
import { domainConfigRoutes } from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      domainConfig: "domainConfig/domainConfig"
    })
  },
  async created() {
    await this.$store.dispatch("uiParams/showNavBar");
    await this.$store
      .dispatch("domainConfig/getDomainConfig")
      .catch(async () => {
        this.$router.addRoutes(domainConfigRoutes);
        await this.$router.push({ name: "DomainConfig" });
      });
    // BORRAR ESTO!!!!
    this.$router.addRoutes(domainConfigRoutes);
    await this.$router.push({ name: "DomainConfig" });
  }
};
</script>

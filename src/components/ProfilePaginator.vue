<template>
  <nav class="paginator">
    <ul class="buttonList">
      <button v-for="buttonNum in numButtons" :key="buttonNum" @click="goToPage(buttonNum)" class="pageButton">
        {{ buttonNum }}
      </button>
    </ul>
    <section class="numSelection">
      <label for="perPage">Number of Items Per Page</label>
      <input type="number" name="perPage" id="perPage" v-model="numPerPage" @input="goToPage(page)" min="1" :max="numItems"/>
    </section>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfilePaginator",
  emits: [
    "onChange",
  ],
  props: {
    items: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      default: 2
    },
  },
  data() {
    return {
      page: 1,
      numPerPage: this.perPage,
    };
  },
  computed: {
    numItems() {
      return this.items.length;
    },
    numButtons() {
      return Math.ceil(this.numItems / this.numPerPage);
    },
    pageItems() {
      const startIndex = this.numPerPage * (this.page - 1);
      const endIndex = startIndex + (this.numPerPage > this.numItems ? this.numItems : this.numPerPage);
      return this.items.slice(startIndex, endIndex);
    }
  },
  methods: {
    getItemsInPage() {
      const startIndex = this.numPerPage * this.page;
      const endIndex = startIndex + this.numPerPage;
      return this.items.slice(startIndex, endIndex);
    },
    goToPage(pageNum: number) {
      if (pageNum > this.numButtons) {
        this.page = this.numButtons;
      } else {
        this.page = pageNum;
      }
      this.$emit("onChange", this.pageItems);
    },
  },
  mounted() {
    this.goToPage(this.page);
  }
});
</script>

<style scoped>
.paginator {
  width: 100%;
  display: flex;
  flex-direction: column;

  border: 1px;
  border-style: solid;
  border-color: black;
}
.buttonList {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.pageButton {
  font-family: "Zen Kurenaido", sans-serif;
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px;
  border-style: solid;
  border-color: #968298;
  margin: 2px;
}
.pageButton:hover {
  cursor: pointer;
  background-color: #968298;
  border: 1px;
  border-style: solid;
  border-color: white;
}
input[type="number"] {
  margin-left: 5px;
  width: 40px;
  height: 20px;
}
</style>